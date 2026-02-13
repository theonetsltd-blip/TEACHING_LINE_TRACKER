/**
 * app.js - Main Application Logic
 * Orchestrates initialization and form handling
 */

// Diagnostic function to check module status
function checkModules() {
    const modules = {
        'firebase': typeof firebase !== 'undefined',
        'firebase-config': typeof getCurrentUser === 'function',
        'security': typeof secureLogin === 'function',
        'db': typeof initDB === 'function',
        'ui': typeof getProfile === 'function'
    };
    
    console.log('🔍 Module Status:');
    Object.entries(modules).forEach(([name, loaded]) => {
        console.log(`   ${loaded ? '✓' : '❌'} ${name}`);
    });
    
    return modules;
}

// Make diagnostic available globally
window.debugApp = checkModules;

console.log('📚 Teaching Progress Tracker PWA');
console.log('Offline-first app for tracking vocational training progress');
console.log('Debug functions available: window.debugApp');

// Initialize app on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 App initializing...');
    
    try {
        // Check modules first
        const modules = checkModules();
        if (!modules['db']) {
            throw new Error('db.js module failed to load - check console for errors');
        }
        if (!modules['ui']) {
            throw new Error('ui.js module failed to load - check console for errors');
        }
        if (!modules['security']) {
            throw new Error('security.js module failed to load - check console for errors');
        }
        
        // Check if we're in standalone mode (PWA)
        const isStandalone = window.navigator.standalone === true || 
                            window.matchMedia('(display-mode: standalone)').matches;
        console.log(isStandalone ? '📱 Running as PWA (standalone)' : '🌐 Running in browser');
        
        // Wait for ui.js to load
        console.log('⏳ Waiting for UI module to load...');
        await new Promise(resolve => {
            if (typeof getProfile === 'function') {
                resolve();
            } else {
                const checkInterval = setInterval(() => {
                    if (typeof getProfile === 'function') {
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 50);
                // Timeout after 5 seconds
                setTimeout(() => {
                    clearInterval(checkInterval);
                    console.error('UI module did not load within 5 seconds');
                    resolve();
                }, 5000);
            }
        });
        
        // Hide main content initially
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) {
            console.error('❌ ERROR: main-content element not found in DOM!');
            alert('Critical Error: App structure not loaded. Please refresh.');
            return;
        }
        mainContent.classList.remove('visible');
        
        // Check session validity first
        const hasValidSession = typeof isSessionValid === 'function' ? isSessionValid() : false;
        const profile = typeof getProfile === 'function' ? getProfile() : null;
        
        // ALSO check if Firebase has an active user (session persistence)
        let firebaseUser = null;
        if (typeof auth !== 'undefined' && auth) {
            firebaseUser = auth.currentUser;
        }
        
        // Admin mode: if session role is admin, open Admin Panel and skip normal content
        const sessionData = typeof getSessionData === 'function' ? getSessionData() : null;
        if (sessionData && sessionData.role === 'admin') {
            console.log('🔓 Admin session detected. Opening Admin Panel.');
            document.getElementById('authLanding').style.display = 'none';
            if (typeof openAdminPanel === 'function') openAdminPanel();
        } else if ((hasValidSession || firebaseUser) && profile && profile.teacherName) {
            // Valid session exists (local or Firebase) - show content
            console.log('✓ Valid session found. Loading app...');
            document.getElementById('authLanding').style.display = 'none';
            mainContent.classList.add('visible');
            if (typeof updateHeaderWithTeacherInfo === 'function') {
                updateHeaderWithTeacherInfo();
            }
        } else if (profile && profile.teacherName && !hasValidSession && !firebaseUser) {
            // Profile exists but session invalid - show login
            console.log('⚠️ Session expired. Requiring login...');
            if (typeof clearSession === 'function') {
                clearSession();
            }
            document.getElementById('authLanding').style.display = 'flex';
        } else {
            // No profile - show auth landing page
            console.log('No profile found. Showing auth landing...');
            document.getElementById('authLanding').style.display = 'flex';
        }
        
        // Initialize database
        console.log('💾 Initializing IndexedDB...');
        if (typeof initDB !== 'function') {
            throw new Error('initDB function not found - db.js not loaded');
        }
        await initDB();
        console.log('✓ Database initialized');
        
        // Check if database is empty and seed if needed
        if (typeof isDatabaseEmpty !== 'function') {
            throw new Error('isDatabaseEmpty function not found - db.js not loaded');
        }
        const isEmpty = await isDatabaseEmpty();
        
        if (typeof getAllLessons !== 'function') {
            throw new Error('getAllLessons function not found - db.js not loaded');
        }
        const allLessons = await getAllLessons();
        console.log(`📊 Database status: ${allLessons.length} topics found`);
        
        // If database is empty OR has only old 13 topics, reseed
        if (isEmpty || allLessons.length < 50) {
            console.log(`🔄 Database has ${allLessons.length} topics. Expected 55+. Reseeding...`);
            
            // Clear old data first if it exists
            if (allLessons.length > 0 && allLessons.length < 50) {
                console.log('🗑️  Clearing old curriculum data...');
                if (typeof clearAllLessons !== 'function') {
                    throw new Error('clearAllLessons function not found - db.js not loaded');
                }
                await clearAllLessons();
            }
            
            console.log('📚 Seeding 55-topic curriculum...');
            if (typeof seedInitialLessons !== 'function') {
                throw new Error('seedInitialLessons function not found - db.js not loaded');
            }
            await seedInitialLessons();
            console.log('✓ Seed complete!');
        } else if (allLessons.length > 60) {
            console.warn(`⚠️  Database has ${allLessons.length} topics - possible duplicates!`);
            // Detect and remove duplicates by topic name
            const seen = {};
            const duplicates = [];
            for (const lesson of allLessons) {
                if (seen[lesson.topic]) {
                    duplicates.push(lesson.id);
                } else {
                    seen[lesson.topic] = true;
                }
            }
            
            if (duplicates.length > 0) {
                console.log(`🔍 Found ${duplicates.length} duplicates, removing...`);
                if (typeof deleteLessonFromDB !== 'function') {
                    throw new Error('deleteLessonFromDB function not found - db.js not loaded');
                }
                for (const id of duplicates) {
                    await deleteLessonFromDB(id);
                }
                console.log('✓ Duplicates removed!');
            }
        } else {
            console.log(`✓ Database loaded: ${allLessons.length} topics found`);
        }
        
        // Render all columns
        console.log('🎨 Rendering Kanban board...');
        try {
            if (typeof renderAllColumns !== 'function') {
                throw new Error('renderAllColumns function not found in ui.js');
            }
            await renderAllColumns();
        } catch (renderError) {
            console.error('❌ Render error:', renderError);
            console.warn('⚠️ Continuing despite render error...');
        }
        
        console.log('✅ App initialized successfully');
    } catch (error) {
        console.error('❌ App initialization error:', error.message);
        console.error('Error type:', error.name);
        console.error('Stack trace:', error.stack);
        
        // Try to identify which step failed
        if (error.message.includes('initDB')) {
            console.error('FAILED AT: Database initialization (db.js)');
            alert('Error: Database failed to initialize. Try opening reset-db.html');
        } else if (error.message.includes('isDatabaseEmpty')) {
            console.error('FAILED AT: Database check (db.js)');
            alert('Error: Database check failed. Try opening reset-db.html');
        } else if (error.message.includes('seedInitialLessons')) {
            console.error('FAILED AT: Seeding initial lessons (db.js)');
            alert('Error: Failed to seed lessons. Try opening reset-db.html');
        } else if (error.message.includes('renderAllColumns')) {
            console.error('FAILED AT: Rendering kanban board (ui.js)');
            alert('Error: Failed to render app. Please refresh the page');
        } else {
            console.error('FAILED AT: Unknown step');
            alert('Error initializing app: ' + error.message + '\n\nPlease refresh the page or open reset-db.html');
        }
    }
});

// ========================
// FORM SUBMISSION
// ========================

document.getElementById('lessonForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // Collect form data
        const lesson = {
            topic: topicInput.value.trim(),
            week: weekInput.value ? parseInt(weekInput.value) : null,
            status: statusSelect.value,
            periodsPlanned: parseInt(periodsPlannedInput.value) || 2,
            periodsUsed: parseInt(periodsUsedInput.value) || 0,
            lastTaught: lastTaughtInput.value,
            nextStart: nextStartInput.value.trim(),
            remarks: remarksInput.value.trim()
        };
        
        // Validate topic name
        if (!lesson.topic) {
            alert('Please enter a topic name');
            return;
        }
        
        // If editing, add the ID
        if (currentEditingLessonId) {
            lesson.id = currentEditingLessonId;
        }
        
        // Save to database
        showSyncIndicator('💾 Saving topic...');
        const savedId = await saveLessonToDB(lesson);
        console.log('Lesson saved with ID:', savedId);
        
        // Sync to cloud if online
        if (isOnline && getCurrentUser()) {
            lesson.id = savedId;
            showSyncIndicator('⏳ Syncing to cloud...');
            await saveLessonToCloud(lesson);
            showSyncIndicator('✅ Synced!');
        } else if (!isOnline) {
            console.log('Offline - saved locally. Will sync when online.');
        }
        
        // Re-render
        showSyncIndicator('🔄 Updating view...');
        await renderAllColumns();
        showSyncIndicator('✅ Topic saved');
        
        // Close modal
        closeLessonModal();
        
        // Show success message
        const msg = isOnline ? `Topic "${lesson.topic}" saved and synced!` : `Topic "${lesson.topic}" saved locally (will sync online)`;
        showNotification(msg);
        
    } catch (error) {
        console.error('Error saving lesson:', error);
        alert('Error saving topic. Please try again.');
    }
});

// ========================
// NOTIFICATION
// ========================

function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// ========================
// KEYBOARD SHORTCUTS
// ========================

document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeLessonModal();
        closeExportModalWindow();
        closeDeleteModal();
    }
    
    // Add new topic with Ctrl+N or Cmd+N
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openLessonModal();
    }
});

// ========================
// PAGE VISIBILITY
// ========================

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Re-render when user returns to tab
        // This ensures latest data is displayed
        if (typeof renderAllColumns === 'function') {
            renderAllColumns().catch(err => console.error('Error re-rendering:', err));
        }
    }
});

// ========================
// OFFLINE DETECTION
// ========================

window.addEventListener('online', () => {
    console.log('App is online');
    showNotification('✓ You are online');
});

window.addEventListener('offline', () => {
    console.log('App is offline');
    showNotification('⚠ You are offline - all data is saved locally', 5000);
});

// Check initial online status
if (!navigator.onLine) {
    showNotification('⚠ Working offline', 5000);
}

// ========================
// INSTALL PROMPT
// ========================

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('Install prompt available');
});

// Future: Add install button if needed
// installBtn.addEventListener('click', async () => {
//     if (deferredPrompt) {
//         deferredPrompt.prompt();
//         const { outcome } = await deferredPrompt.userChoice;
//         console.log(`User response to the install prompt: ${outcome}`);
//         deferredPrompt = null;
//     }
// });

// ========================
// DEBUG FUNCTIONS (Console)
// ========================

// Make useful functions available in console for debugging
window.debugApp = {
    getAllLessons: () => getAllLessons(),
    exportToCSV: () => exportToCSV(),
    clearDatabase: async () => {
        if (confirm('Are you sure you want to delete ALL lessons?')) {
            await clearAllLessons();
            await renderAllColumns();
            console.log('All lessons cleared');
        }
    },
    reloadData: async () => {
        await renderAllColumns();
        console.log('Data reloaded');
    }
};

console.log('%c📚 Teaching Progress Tracker PWA', 'color: #2c3e50; font-size: 20px; font-weight: bold;');
console.log('%cOffline-first app for tracking vocational training progress', 'color: #7f8c8d; font-size: 12px;');
console.log('%cDebug functions available: window.debugApp', 'color: #3498db; font-size: 12px;');
