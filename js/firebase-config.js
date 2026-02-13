/**
 * firebase-config.js - Firebase Configuration & Cloud Sync
 * MANDATORY cloud synchronization - all data automatically synced to Firebase
 */

// Initialize Firebase - Configuration from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyD_XiAWEVO0EjOkz01b6QP6pLRuG6iSbnk",
    authDomain: "teaching-progress-tracker.firebaseapp.com",
    projectId: "teaching-progress-tracker",
    storageBucket: "teaching-progress-tracker.firebasestorage.app",
    messagingSenderId: "1018317010119",
    appId: "1:1018317010119:web:9b2c4ec46da3b6b6c57ae2",
    measurementId: "G-TQWFMQ2QYH"
};

// Ensure Firebase is ready before initializing
let auth = null;
let firestore = null;
let firebaseReady = false;
let initAttempts = 0;

function initializeFirebase() {
    try {
        // Check that all Firebase modules are loaded
        if (!window.firebase) {
            console.warn('⏳ Firebase SDK not loaded yet, retrying... (attempt ' + (++initAttempts) + ')');
            setTimeout(initializeFirebase, 150);
            return false;
        }
        
        if (!window.firebase.auth || !window.firebase.firestore) {
            console.warn('⏳ Firebase modules (auth/firestore) not ready, retrying...');
            setTimeout(initializeFirebase, 150);
            return false;
        }
        
        if (firebaseReady) return true; // Already initialized
        
        // Try to initialize only if not already initialized
        try {
            firebase.initializeApp(firebaseConfig);
        } catch (e) {
            // App already initialized, get the existing instances
            if (e.code !== 'app/duplicate-app') {
                throw e;
            }
        }
        
        auth = firebase.auth();
        firestore = firebase.firestore();
        firebaseReady = true;
        
        console.log('✓ Firebase initialized successfully');
        console.log('  - Auth module:', !!auth);
        console.log('  - Firestore module:', !!firestore);
        console.log('  - Auth ready:', firebase.auth() !== undefined);
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error.message);
        // Retry in 500ms
        setTimeout(initializeFirebase, 500);
        return false;
    }
}

// Initialize on script load with small delay to ensure compat libs are ready
setTimeout(initializeFirebase, 250);

let currentUser = null;
let autoSyncEnabled = false; // Automatic sync flag

// ========================
// AUTHENTICATION (MANDATORY)
// ========================

// Sign up new teacher (REQUIRED - No local-only option)
async function signUpTeacher(email, password, teacherProfile) {
    // Wait for Firebase to be ready (with timeout)
    let retries = 0;
    while (!firebaseReady && retries < 100) { // Up to 10 seconds
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }
    
    if (!auth || !firestore) {
        console.error('Firebase still not initialized after wait. auth:', !!auth, 'firestore:', !!firestore);
        return { success: false, error: 'Firebase not initialized. Please refresh the page and try again.' };
    }
    
    try {
        // Create Firebase auth user
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        currentUser = userCredential.user;
        
        // Save teacher profile to Firestore (MANDATORY)
        await firestore.collection('teachers').doc(currentUser.uid).set({
            email: email,
            teacherName: teacherProfile.teacherName,
            subject: teacherProfile.subjectName || teacherProfile.subject || '',
            schoolName: teacherProfile.schoolName || '',
            phone: teacherProfile.phone || '',
            classroom: teacherProfile.classroom || '',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        // Store user ID locally
        localStorage.setItem('firebaseUID', currentUser.uid);
        
        // Enable automatic sync
        autoSyncEnabled = true;
        startAutoSync();
        
        console.log('✓ Teacher registered & Cloud sync enabled:', currentUser.uid);
        return { success: true, uid: currentUser.uid };
    } catch (error) {
        console.error('Registration failed:', error.message);
        return { success: false, error: error.message };
    }
}

// Login teacher (REQUIRED - Must authenticate to use app)
async function loginTeacher(email, password) {
    // Wait for Firebase to be ready (with timeout)
    let retries = 0;
    while (!firebaseReady && retries < 100) { // Up to 10 seconds
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }
    
    if (!auth || !firestore) {
        console.error('Firebase still not initialized after wait. auth:', !!auth, 'firestore:', !!firestore);
        return { success: false, error: 'Firebase not initialized. Please refresh the page and try again.' };
    }
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        currentUser = userCredential.user;
        localStorage.setItem('firebaseUID', currentUser.uid);
        
        // Enable automatic sync
        autoSyncEnabled = true;
        startAutoSync();
        
        console.log('✓ Teacher logged in & Cloud sync enabled:', currentUser.uid);
        return { success: true, uid: currentUser.uid };
    } catch (error) {
        console.error('Login failed:', error.message);
        return { success: false, error: error.message };
    }
}

// Logout
async function logoutTeacher() {
    if (!auth) {
        return { success: false, error: 'Firebase not initialized.' };
    }
    
    try {
        await auth.signOut();
        currentUser = null;
        autoSyncEnabled = false;
        localStorage.removeItem('firebaseUID');
        console.log('✓ Teacher logged out & Cloud sync disabled');
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error.message);
        return { success: false, error: error.message };
    }
}

// Get current user
function getCurrentUser() {
    // Safety check - return null if not initialized
    try {
        return currentUser || null;
    } catch (error) {
        console.warn('⚠️ getCurrentUser called before Firebase initialized');
        return null;
    }
}

// ========================
// MANDATORY CLOUD SYNC
// ========================

// Sync queue and status (initialized at top)
let syncQueue = [];
let isSyncing = false;

// Save lesson to Firebase (MANDATORY - no fallback to local only)
async function saveLessonToCloud(lesson) {
    if (!currentUser) {
        // MANDATORY: Queue for sync when user logs in
        syncQueue.push({ action: 'save', data: lesson, timestamp: new Date() });
        console.warn('⚠️ Queued for cloud sync - user not authenticated yet');
        return { success: false, queued: true, error: 'Queued for sync after login' };
    }
    
    // Skip if lesson data is invalid
    if (!lesson || !lesson.id) {
        console.warn('⚠️ Skipping invalid lesson:', lesson);
        return { success: false, error: 'Invalid lesson data' };
    }
    
    try {
        const lessonRef = firestore.collection('teachers').doc(currentUser.uid).collection('lessons').doc(lesson.id?.toString() || 'temp');
        const lessonData = {
            ...lesson,
            syncedAt: new Date(),
            localId: lesson.id || ''
        };
        
        // Remove any undefined fields
        Object.keys(lessonData).forEach(key => {
            if (lessonData[key] === undefined) {
                delete lessonData[key];
            }
        });
        
        await lessonRef.set(lessonData, { merge: true });
        
        console.log('✓ Lesson synced to cloud:', lesson.id);
        return { success: true };
    } catch (error) {
        console.error('❌ Cloud sync error:', error.message);
        // MANDATORY: Queue for retry if sync fails
        syncQueue.push({ action: 'save', data: lesson, timestamp: new Date() });
        console.warn('⚠️ Queued for retry:', lesson.id);
        return { success: false, queued: true, error: error.message };
    }
}

// Get all lessons from cloud
async function getAllLessonsFromCloud() {
    if (!currentUser) {
        console.warn('Not logged in - cannot fetch from cloud');
        return [];
    }
    
    try {
        const snapshot = await firestore.collection('teachers').doc(currentUser.uid).collection('lessons').get();
        const lessons = [];
        snapshot.forEach(doc => {
            lessons.push({ id: doc.data().localId, ...doc.data() });
        });
        console.log(`Fetched ${lessons.length} lessons from cloud`);
        return lessons;
    } catch (error) {
        console.error('Error fetching from cloud:', error.message);
        return [];
    }
}

// Delete lesson from cloud (MANDATORY - no local-only deletes)
async function deleteLessonFromCloud(lessonId) {
    if (!currentUser) {
        // MANDATORY: Queue delete for sync
        syncQueue.push({ action: 'delete', data: { id: lessonId }, timestamp: new Date() });
        console.warn('⚠️ Delete queued for cloud sync');
        return { success: false, queued: true };
    }
    
    try {
        // Try to find and delete the document
        const snapshot = await firestore.collection('teachers').doc(currentUser.uid).collection('lessons')
            .where('localId', '==', lessonId).limit(1).get();
        
        if (!snapshot.empty) {
            await snapshot.docs[0].ref.delete();
        }
        
        console.log('✓ Lesson deleted from cloud:', lessonId);
        return { success: true };
    } catch (error) {
        console.error('❌ Error deleting from cloud:', error.message);
        // MANDATORY: Queue for retry
        syncQueue.push({ action: 'delete', data: { id: lessonId }, timestamp: new Date() });
        console.warn('⚠️ Delete queued for retry:', lessonId);
        return { success: false, queued: true, error: error.message };
    }
}

// Start automatic cloud sync (MANDATORY - called after login/signup)
async function startAutoSync() {
    if (!currentUser) {
        console.warn('⚠️ Cannot start auto-sync: User not authenticated');
        return;
    }
    
    autoSyncEnabled = true;
    console.log('✓ MANDATORY Auto-Sync Enabled for user:', currentUser.email);
    
    // Process any queued operations from offline period
    await processSyncQueue();
    
    // Enable real-time sync listener
    setupRealtimeSyncListener();
}

// Stop automatic cloud sync (only on logout)
function stopAutoSync() {
    autoSyncEnabled = false;
    console.log('Auto-Sync Disabled');
}

// Process queued sync operations (from offline period)
async function processSyncQueue() {
    if (syncQueue.length === 0) return;
    
    console.log(`⏳ Processing ${syncQueue.length} queued operations...`);
    const queue = [...syncQueue];
    syncQueue = [];
    
    for (const item of queue) {
        try {
            if (item.action === 'save') {
                await saveLessonToCloud(item.data);
            } else if (item.action === 'delete') {
                await deleteLessonFromCloud(item.data.id);
            }
        } catch (error) {
            console.error('Error processing queued operation:', error);
            // Re-queue failed operation
            syncQueue.push(item);
        }
    }
    
    console.log(`✓ Sync queue processed. ${syncQueue.length} items remain in queue if errors occurred.`);
}

// Setup real-time sync listener (MANDATORY when logged in)
function setupRealtimeSyncListener() {
    if (!currentUser || !autoSyncEnabled) return null;
    
    console.log('Setting up real-time cloud sync listener...');
    const unsubscribe = firestore.collection('teachers').doc(currentUser.uid).collection('lessons')
        .onSnapshot(
            (snapshot) => {
                const lessons = [];
                snapshot.forEach(doc => {
                    lessons.push({ id: doc.data().localId, ...doc.data() });
                });
                console.log('📡 Real-time sync: Updated with', lessons.length, 'lessons from cloud');
            },
            (error) => {
                console.error('❌ Real-time sync error:', error.message);
                // Will retry automatically by Firebase SDK
            }
        );
    
    return unsubscribe;
}

// Push local data to cloud (MANDATORY on sync operations)
async function pushLocalDataToCloud() {
    if (!currentUser) {
        console.warn('⚠️ Cannot push data - user not authenticated');
        return { success: false, count: 0 };
    }
    
    try {
        isSyncing = true;
        console.log('⏳ Pushing local data to cloud...');
        const allLessons = await getAllLessons(); // From IndexedDB
        let synced = 0;
        let failed = 0;
        
        for (const lesson of allLessons) {
            const result = await saveLessonToCloud(lesson);
            if (result.success) {
                synced++;
            } else {
                failed++;
            }
        }
        
        isSyncing = false;
        console.log(`✓ Push complete: ${synced} synced, ${failed} in queue for retry`);
        return { success: true, count: synced };
    } catch (error) {
        isSyncing = false;
        console.error('❌ Error pushing to cloud:', error.message);
        return { success: false, count: 0, error: error.message };
    }
}

// Pull cloud data to local (MANDATORY sync check)
async function pullCloudDataToLocal() {
    if (!currentUser) {
        console.warn('⚠️ Cannot pull data - user not authenticated');
        return { success: false, count: 0 };
    }
    
    try {
        isSyncing = true;
        console.log('⏳ Pulling cloud data to local...');
        const cloudLessons = await getAllLessonsFromCloud();
        let synced = 0;
        
        for (const lesson of cloudLessons) {
            await saveLessonToDB(lesson); // Save to IndexedDB
            synced++;
        }
        
        isSyncing = false;
        console.log(`✓ Pull complete: ${synced} lessons synced to local`);
        return { success: true, count: synced };
    } catch (error) {
        isSyncing = false;
        console.error('❌ Error pulling from cloud:', error.message);
        return { success: false, count: 0, error: error.message };
    }
}

// Smart two-way sync (MANDATORY sync strategy)
async function smartSync() {
    if (!currentUser) {
        console.warn('⚠️ Cannot sync - user not authenticated');
        return { success: false };
    }
    
    if (isSyncing) {
        console.log('⏳ Sync already in progress...');
        return { success: false, error: 'Sync in progress' };
    }
    
    try {
        console.log('🔄 Starting MANDATORY cloud sync...');
        
        // Process any queued operations first
        if (syncQueue.length > 0) {
            await processSyncQueue();
        }
        
        // Push local changes to cloud
        await pushLocalDataToCloud();
        
        // Pull cloud changes to local
        await pullCloudDataToLocal();
        
        console.log('✓ MANDATORY cloud sync completed');
        return { success: true };
    } catch (error) {
        console.error('❌ Smart sync error:', error.message);
        return { success: false, error: error.message };
    }
}
