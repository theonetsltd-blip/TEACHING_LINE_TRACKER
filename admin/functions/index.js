// Firebase Admin Cloud Function: List Users (secured)
// Requires: Firebase CLI, Admin SDK, function deployed with proper IAM

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const auth = admin.auth();
const db = admin.firestore();

// Helper: verify caller is authenticated and has admin claim
async function verifyAdmin(req) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.*)$/);
  if (!match) throw new Error('Missing bearer token');
  const idToken = match[1];
  const decoded = await auth.verifyIdToken(idToken);
  if (!decoded || !decoded.uid) throw new Error('Invalid token');
  if (!decoded.admin) throw new Error('Admin privileges required');
  return decoded;
}

exports.listUsers = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
      }

      await verifyAdmin(req);

      // Paginate via query params if needed
      const limit = Math.min(parseInt(req.query.limit || '100', 10), 1000);
      const pageToken = req.query.pageToken || undefined;

      const result = await auth.listUsers(limit, pageToken);
      const users = result.users.map(u => ({ uid: u.uid, email: u.email || null, disabled: !!u.disabled }));

      // Join with Firestore teacher profiles (optional)
      const teacherDocs = await db.collection('teachers').get();
      const teacherMap = {};
      teacherDocs.forEach(doc => { teacherMap[doc.id] = doc.data(); });
      const enriched = users.map(u => ({
        uid: u.uid,
        email: u.email,
        disabled: u.disabled,
        teacherName: teacherMap[u.uid]?.teacherName || null,
        subject: teacherMap[u.uid]?.subject || null,
      }));

      // Example metrics
      const activeToday = null; // Implement if you track activity
      const cloudLessons = null; // Implement if you store lessons per user globally

      res.json({ success: true, users: enriched, pageToken: result.pageToken || null, activeToday, cloudLessons });
    } catch (err) {
      console.error('listUsers error:', err);
      const status = /admin|token|auth/i.test(err.message || '') ? 403 : 500;
      res.status(status).json({ success: false, error: err.message });
    }
  });
});
