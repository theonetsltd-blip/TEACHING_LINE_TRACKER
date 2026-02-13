# Admin Backend (Firebase Admin SDK)

This backend exposes a secure Cloud Function to list Firebase Auth users, enriched with Firestore `teachers` profiles. The client Admin Dashboard calls this endpoint with a bearer ID token. Only callers with the custom claim `admin: true` can access it.

## Prerequisites
- Firebase project with Authentication and Firestore enabled
- Firebase CLI installed (`npm i -g firebase-tools`)
- Logged in to Firebase CLI: `firebase login`
- A service account for local emulation, or deploy directly
- An admin user with a custom claim `admin: true`

## Install & Deploy
```powershell
npm install -g firebase-tools
firebase login
firebase init functions
cd admin/functions
npm install
firebase deploy --only functions:listUsers
```

## Granting Admin Privileges
Set a custom claim on your admin user (one-off script):
```javascript
// set-admin-claim.js
const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.applicationDefault() });
const auth = admin.auth();

(async () => {
  const uid = '<ADMIN_USER_UID>'; // replace
  await auth.setCustomUserClaims(uid, { admin: true });
  console.log('Admin claim set for', uid);
})();
```
Run with:
```bash
node set-admin-claim.js
```

## Client Configuration
In the app, set the Cloud Function URL in localStorage (e.g., in DevTools):
```javascript
localStorage.setItem('adminListUsersUrl', 'https://us-central1-<PROJECT_ID>.cloudfunctions.net/listUsers');
```
Admin Dashboard "Load Users" sends a bearer token from the current Firebase user. Ensure you are signed in as the admin user (not the local DevSecure override) before calling it.

## Security Notes
- Do not expose multi-user operations directly in the client.
- Always verify the caller's ID token and check the `admin` claim.
- Add rate limiting and audit logging for admin endpoints in production.
