/**
 * ui.js - UI Rendering and Interaction
 * Handles DOM updates and user interactions
 */

// Safety check - ensure DOM is ready and accessible
if (!document.body) {
    console.error('❌ CRITICAL ERROR: DOM not ready when ui.js loaded');
    throw new Error('DOM not ready - ui.js loaded before body element');
}

console.log('📄 UI module loading... checking DOM elements');

// Modal management - with null safety
const lessonModal = document.getElementById('lessonModal');
const lessonForm = document.getElementById('lessonForm');
const modalTitle = document.getElementById('modalTitle');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');

const exportModal = document.getElementById('exportModal');
const closeExportModalBtn = document.getElementById('closeExportModalBtn');
const exportCSV = document.getElementById('exportCSV');
const exportPDF = document.getElementById('exportPDF');

const authLanding = document.getElementById('authLanding');
const loginBtn = document.getElementById('loginBtn');
const createProfileBtn = document.getElementById('createProfileBtn');

const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginTeacherNameInput = document.getElementById('loginTeacherName');
const loginPasswordInput = document.getElementById('loginPassword');
const backLoginBtn = document.getElementById('backLoginBtn');
const backFromLoginBtn = document.getElementById('backFromLoginBtn');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeForgotPasswordBtn = document.getElementById('closeForgotPasswordBtn');
const resetVerificationStep = document.getElementById('resetVerificationStep');
const resetPasswordStep = document.getElementById('resetPasswordStep');
const resetTeacherName = document.getElementById('resetTeacherName');
const resetVerificationMethod = document.getElementById('resetVerificationMethod');
const resetVerificationValue = document.getElementById('resetVerificationValue');
const resetVerifyBtn = document.getElementById('resetVerifyBtn');
const resetBackBtn = document.getElementById('resetBackBtn');
const resetBackToVerifyBtn = document.getElementById('resetBackToVerifyBtn');
const resetNewPassword = document.getElementById('resetNewPassword');
const resetConfirmPassword = document.getElementById('resetConfirmPassword');
const resetSubmitBtn = document.getElementById('resetSubmitBtn');

const createProfileModal = document.getElementById('createProfileModal');
const profileForm = document.getElementById('profileForm');
const teacherNameInput = document.getElementById('teacherName');
const subjectNameInput = document.getElementById('subjectName');
const schoolNameInput = document.getElementById('schoolName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const classroomInput = document.getElementById('classroom');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const backCreateBtn = document.getElementById('backCreateBtn');
const backFromCreateBtn = document.getElementById('backFromCreateBtn');

const teacherInfo = document.getElementById('teacherInfo');

const settingsModal = document.getElementById('settingsModal');
const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const forceResetBtn = document.getElementById('forceResetBtn');
const loadDefaultTopicsBtn = document.getElementById('loadDefaultTopicsBtn');
const editProfileBtn = document.getElementById('editProfileBtn');
const logoutBtn = document.getElementById('logoutBtn');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const changePasswordModal = document.getElementById('changePasswordModal');
const closeChangePasswordModalBtn = document.getElementById('closeChangePasswordModalBtn');
const cancelChangePasswordBtn = document.getElementById('cancelChangePasswordBtn');
const changePasswordForm = document.getElementById('changePasswordForm');
const currentPasswordInput = document.getElementById('currentPassword');
const newPasswordInput = document.getElementById('newPassword');
const confirmNewPasswordInput = document.getElementById('confirmNewPassword');

// Profile Settings Modal
const profileSettingsModal = document.getElementById('profileSettingsModal');
const closeProfileSettingsBtn = document.getElementById('closeProfileSettingsBtn');
const backProfileSettingsBtn = document.getElementById('backProfileSettingsBtn');
const editNameBtn = document.getElementById('editNameBtn');
const editPhoneBtn = document.getElementById('editPhoneBtn');
const viewTopicListBtn = document.getElementById('viewTopicListBtn');
const deleteTopicBtn = document.getElementById('deleteTopicBtn');
const nextPeriodBtn = document.getElementById('nextPeriodBtn');
const displayTeacherName = document.getElementById('displayTeacherName');
const displaySubject = document.getElementById('displaySubject');
const displayPhone = document.getElementById('displayPhone');

const deleteModal = document.getElementById('deleteModal');
const closeDeleteModalBtn = document.getElementById('closeDeleteModalBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const deleteTopicName = document.getElementById('deleteTopicName');

// Form fields
const topicInput = document.getElementById('topicName');
const weekInput = document.getElementById('week');
const periodsPlannedInput = document.getElementById('periodsPlanned');
const periodsUsedInput = document.getElementById('periodsUsed');
const lastTaughtInput = document.getElementById('lastTaught');
const nextStartInput = document.getElementById('nextStart');
const remarksInput = document.getElementById('remarks');
const statusSelect = document.getElementById('status');

// Buttons
const exportBtn = document.getElementById('exportBtn');
const settingsBtn = document.getElementById('settingsBtn');
const adminBadge = document.getElementById('adminBadge');
const adminDashboardBtn = document.getElementById('adminDashboardBtn');
const subjectSwitchHeaderBtn = document.getElementById('subjectSwitchHeaderBtn');

// Danger Zone elements
const dangerDeleteCloudBtn = document.getElementById('dangerDeleteCloudBtn');
const dangerDeleteAccountBtn = document.getElementById('dangerDeleteAccountBtn');
const confirmDeleteCloudInput = document.getElementById('confirmDeleteCloudInput');
const confirmDeleteAccountInput = document.getElementById('confirmDeleteAccountInput');
const adminUsernameInput = document.getElementById('adminUsernameInput');
const adminPasswordInput = document.getElementById('adminPasswordInput');
const adminUnlockBtn = document.getElementById('adminUnlockBtn');
const adminUnlockStatus = document.getElementById('adminUnlockStatus');
const dangerZone = document.getElementById('dangerZone');

// Admin Panel elements
const adminPanelModal = document.getElementById('adminPanelModal');
const closeAdminPanelBtn = document.getElementById('closeAdminPanelBtn');
const backFromAdminBtn = document.getElementById('backFromAdminBtn');
const adminDeleteCloudBtn = document.getElementById('adminDeleteCloudBtn');
const adminDeleteAccountBtn = document.getElementById('adminDeleteAccountBtn');
const adminConfirmDeleteCloudInput = document.getElementById('adminConfirmDeleteCloudInput');
const adminConfirmDeleteAccountInput = document.getElementById('adminConfirmDeleteAccountInput');
const loadTopicsBtn = document.getElementById('loadTopicsBtn');
const loadTopicsModal = document.getElementById('loadTopicsModal');
const closeLoadTopicsModalBtn = document.getElementById('closeLoadTopicsModalBtn');
const closeLoadTopicsBtn = document.getElementById('closeLoadTopicsBtn');
const loadDefaultTopicsFormBtn = document.getElementById('loadDefaultTopicsFormBtn');
const loadFromFileBtn = document.getElementById('loadFromFileBtn');

const viewTopicsBtn = document.getElementById('viewTopicsBtn');
const viewTopicsModal = document.getElementById('viewTopicsModal');
const closeViewTopicsModalBtn = document.getElementById('closeViewTopicsModalBtn');
const closeViewTopicsBtn = document.getElementById('closeViewTopicsBtn');
const topicsSearchInput = document.getElementById('topicsSearchInput');
const topicsListContainer = document.getElementById('topicsListContainer');
// Admin Dashboard elements
const adminDashboard = document.getElementById('adminDashboard');
const backFromAdminDashboardBtn = document.getElementById('backFromAdminDashboardBtn');
const adminLoadUsersBtn = document.getElementById('adminLoadUsersBtn');
const adminUsersTableBody = document.getElementById('adminUsersTableBody');
const adminStatTotalUsers = document.getElementById('adminStatTotalUsers');
const adminStatActiveToday = document.getElementById('adminStatActiveToday');
const adminStatCloudLessons = document.getElementById('adminStatCloudLessons');

// Subject Selection Modal
const subjectSelectionModal = document.getElementById('subjectSelectionModal');
const subjectGrid = document.getElementById('subjectGrid');
const submitSubjectBtn = document.getElementById('submitSubjectBtn');
const closeSubjectSelectionBtn = document.getElementById('closeSubjectSelectionBtn');

// Vocational subjects list
const vocationalSubjects = [
    'Basic Computer Knowledge',
    'ICT/Information Technology',
    'Domestic Electric',
    'Mechanic',
    'Driving',
    'Mathematics Basic',
    'English',
    'Technical Drawing',
    'Building Construction',
    'Welding & Metal Works',
    'Plumbing & Pipe Fitting',
    'Carpentry & Joinery',
    'Hair & Beauty',
    'Hospitality Management',
    'Agriculture',
    'Tailoring & Dressmaking'
];

// Global levels list (select level first)
const levelsList = ['Level One', 'Level Two'];

// Global state for editing
let currentEditingLessonId = null;
let currentDeletingLessonId = null;
let selectedSubject = null;

console.log('✓ UI module DOM elements loaded');// ========================
// INTERNET CONNECTION DETECTION
// ========================

let isOnline = navigator.onLine;
const connectionStatus = document.getElementById('connectionStatus');
const connectionIndicator = document.getElementById('connectionIndicator');
const connectionText = document.getElementById('connectionText');
const syncIndicator = document.getElementById('syncIndicator');
const syncStatus = document.getElementById('syncStatus');
const headerSyncStatus = document.getElementById('headerSyncStatus');
const headerSyncText = document.getElementById('headerSyncText');

let syncTimeout = null;
let activeSyncOps = 0;
let lastSyncAt = null;

// Professional loading overlay
let globalLoaderCount = 0;
function showGlobalLoader(message = 'Working...', sub = 'Please wait') {
    const el = document.getElementById('globalLoader');
    const txt = document.getElementById('globalLoaderText');
    const subEl = document.getElementById('globalLoaderSub');
    if (txt) txt.textContent = message;
    if (subEl) subEl.textContent = sub || '';
    globalLoaderCount++;
    if (el && globalLoaderCount > 0) {
        el.style.display = 'flex';
    }
}

function hideGlobalLoader(force = false) {
    const el = document.getElementById('globalLoader');
    if (force) globalLoaderCount = 0; else globalLoaderCount = Math.max(0, globalLoaderCount - 1);
    if (el && globalLoaderCount === 0) {
        el.style.display = 'none';
    }
}

function updateGlobalLoader(message, sub) {
    const txt = document.getElementById('globalLoaderText');
    const subEl = document.getElementById('globalLoaderSub');
    if (message && txt) txt.textContent = message;
    if (typeof sub !== 'undefined' && subEl) subEl.textContent = sub;
}

// Show sync indicator with status message
function showSyncIndicator(message = '☁️ Syncing data...') {
    syncStatus.textContent = message;
    headerSyncText.textContent = message;
    syncIndicator.style.display = 'block';
    headerSyncStatus.style.display = 'block';
    
    // Clear previous timeout
    if (syncTimeout) clearTimeout(syncTimeout);
    
    // Auto-hide after 3 seconds
    syncTimeout = setTimeout(() => {
        syncIndicator.style.animation = 'slideOut 0.3s ease-out forwards';
        headerSyncStatus.style.opacity = '0.5';
        setTimeout(() => {
            syncIndicator.style.display = 'none';
            syncIndicator.style.animation = 'slideIn 0.3s ease-out';
            headerSyncStatus.style.display = 'none';
            headerSyncStatus.style.opacity = '1';
        }, 300);
    }, 3000);
}

// Persistent Sync UI manager (used by cloud ops)
window.SyncUI = {
    start(msg = '⏳ Syncing...') {
        activeSyncOps++;
        document.body.classList.add('sync-status--active');
        headerSyncStatus.style.display = 'block';
        headerSyncText.textContent = msg;
    },
    update(msg) {
        if (msg) headerSyncText.textContent = msg;
    },
    done(msg = '✓ All changes saved') {
        activeSyncOps = Math.max(0, activeSyncOps - 1);
        if (activeSyncOps === 0) {
            lastSyncAt = new Date();
            localStorage.setItem('lastSyncAt', lastSyncAt.toISOString());
            headerSyncText.textContent = `${msg} • ${lastSyncAt.toLocaleTimeString()}`;
            document.body.classList.remove('sync-status--active');
            document.body.classList.add('sync-status--idle');
            // Keep visible for a bit, then fade
            setTimeout(() => {
                headerSyncStatus.style.display = 'none';
                document.body.classList.remove('sync-status--idle');
            }, 4000);
        } else if (msg) {
            headerSyncText.textContent = msg;
        }
    },
    setLastSync(ts) {
        try {
            lastSyncAt = ts ? new Date(ts) : new Date();
            localStorage.setItem('lastSyncAt', lastSyncAt.toISOString());
        } catch (_) {}
    }
};

function updateConnectionStatus() {
    isOnline = navigator.onLine;
    
    if (isOnline) {
        connectionStatus.style.background = 'transparent';
        connectionStatus.style.boxShadow = 'none';
        connectionStatus.style.color = '#27ae60';
        connectionIndicator.textContent = '●';
        connectionIndicator.style.color = '#27ae60';
        connectionText.textContent = 'Online';
        
        // Auto-sync when connection restored
        syncPendingData();
    } else {
        connectionStatus.style.background = 'transparent';
        connectionStatus.style.boxShadow = 'none';
        connectionStatus.style.color = '#e74c3c';
        connectionIndicator.textContent = '●';
        connectionIndicator.style.color = '#e74c3c';
        connectionText.textContent = 'Offline';
    }
}

// Listen for connection changes
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// Initialize connection status
updateConnectionStatus();

// Function to sync pending data when coming online
async function syncPendingData() {
    if (isOnline && getCurrentUser()) {
        try {
            console.log('Syncing pending data...');
            showSyncIndicator('⏳ Syncing after reconnect...');
            await smartSync();
            showSyncIndicator('✅ Sync complete!');
        } catch (error) {
            console.log('Sync error:', error);
            showSyncIndicator('❌ Sync failed');
        }
    }
}

function renderSubjectSelection() {
    subjectGrid.innerHTML = '';
    vocationalSubjects.forEach(subject => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'subject-btn';
        button.textContent = subject;
        button.dataset.subject = subject;
        button.style.cssText = `
            padding: var(--spacing-lg);
            border: 2px solid var(--border-color);
            border-radius: var(--border-radius);
            background: white;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('click', () => {
            // Remove previous selection
            document.querySelectorAll('.subject-btn').forEach(btn => {
                btn.style.borderColor = 'var(--border-color)';
                btn.style.background = 'white';
                btn.style.color = 'black';
            });
            // Highlight selected
            button.style.borderColor = '#2c3e50';
            button.style.background = '#2c3e50';
            button.style.color = 'white';
            selectedSubject = subject;
        });
        
        subjectGrid.appendChild(button);
    });
}

function openSubjectSelectionModal() {
    renderSubjectSelection();
    createProfileModal.style.display = 'none';
    subjectSelectionModal.style.display = 'flex';
    selectedSubject = null;
}

function closeSubjectSelectionModal() {
    subjectSelectionModal.style.display = 'none';
}

// ========================
// VIEW TOPICS MODAL CONTROLS
// ========================

async function openViewTopicsModal() {
    viewTopicsModal.style.display = 'flex';
    await renderTopicsList();
}

function closeViewTopicsModal() {
    viewTopicsModal.style.display = 'none';
}

async function renderTopicsList(searchTerm = '') {
    try {
        const lessons = await getAllLessons();
        let filteredLessons = lessons;
        // Filter by active subject
        try {
            const profile = getProfile?.();
            const subjectFilter = profile?.activeSubjectName || profile?.subjectName || profile?.subject || '';
            if (subjectFilter) {
                filteredLessons = filteredLessons.filter(l => (l.subjectName || '') === subjectFilter);
            }
        } catch (_) { /* ignore */ }
        // Search term filter
        if (searchTerm) {
            filteredLessons = filteredLessons.filter(lesson => 
                (lesson.topic || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        let html = '<div style="display: grid; grid-template-columns: 1fr; gap: var(--spacing-sm);">';
        if (filteredLessons.length === 0) {
            html += '<p style="text-align: center; padding: var(--spacing-lg); color: var(--text-secondary);">No topics found</p>';
        } else {
            filteredLessons.forEach((lesson, index) => {
                html += `
                    <div class="topic-row" style="padding: var(--spacing-md); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: var(--spacing-md); justify-content: space-between;">
                        <div style="display:flex; align-items:center; gap: var(--spacing-md);">
                            <span style="color: var(--text-secondary); min-width: 30px;">${index + 1}.</span>
                            <span style="color: var(--text-primary);">${lesson.topic}</span>
                        </div>
                        <div>
                            <button class="topic-delete-btn" data-id="${lesson.id}" data-name="${lesson.topic}" style="padding:4px 8px; font-size:12px; background:#ff6b6b; color:#fff; border:none; border-radius:4px; cursor:pointer;">Delete</button>
                        </div>
                    </div>
                `;
            });
        }
        // Add Topic input at end
        html += `
            <div style="margin-top: var(--spacing-lg); display:flex; gap: var(--spacing-sm);">
                <input id="addTopicInput" type="text" placeholder="Add a topic for active subject" style="flex:1; padding: var(--spacing-sm); border: 1px solid var(--border-color); border-radius: var(--border-radius);">
                <button id="addTopicSubmit" class="btn btn-primary">+ Add</button>
            </div>
        `;
        html += '</div>';
        topicsListContainer.innerHTML = html;
        // Bind delete buttons
        topicsListContainer.querySelectorAll('.topic-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const name = btn.dataset.name || '';
                openDeleteModal(id, name);
            });
        });
        // Bind add topic
        const addBtn = document.getElementById('addTopicSubmit');
        const addInput = document.getElementById('addTopicInput');
        addBtn?.addEventListener('click', async () => {
            const topicName = (addInput?.value || '').trim();
            if (!topicName) return;
            let subjectName = '';
            try {
                const profile = getProfile?.();
                subjectName = profile?.activeSubjectName || profile?.subjectName || profile?.subject || '';
            } catch (_) {}
            if (!subjectName) {
                alert('Please select an active subject first.');
                return;
            }
            const lesson = {
                topic: topicName,
                week: null,
                status: 'not-started',
                periodsPlanned: 2,
                periodsUsed: 0,
                lastTaught: '',
                nextStart: '',
                remarks: '',
                subjectName
            };
            try {
                showSyncIndicator?.('🔄 Adding topic...');
                await saveLessonToDB(lesson);
                addInput.value = '';
                await renderAllColumns();
                await renderTopicsList();
                showSyncIndicator?.('✅ Topic added');
            } catch (err) {
                console.error('Add topic error:', err);
                showSyncIndicator?.('❌ Add failed');
            }
        });
    } catch (error) {
        console.error('Error rendering topics list:', error);
        topicsListContainer.innerHTML = '<p style="color: red;">Error loading topics</p>';
    }
}

// ========================
// MODAL CONTROLS
// ========================

function openLessonModal(lessonId = null) {
    // Reset form
    lessonForm.reset();
    currentEditingLessonId = lessonId;
    
    if (lessonId) {
        modalTitle.textContent = 'Edit Topic';
        populateFormWithLesson(lessonId);
    } else {
        modalTitle.textContent = 'Add New Topic';
        // Clear form
        topicInput.value = '';
        weekInput.value = '';
        periodsPlannedInput.value = '2';
        periodsUsedInput.value = '0';
        lastTaughtInput.value = '';
        nextStartInput.value = '';
        remarksInput.value = '';
        statusSelect.value = 'not-started';
    }
    
    lessonModal.style.display = 'flex';
    topicInput.focus();
}

function closeLessonModal() {
    lessonModal.style.display = 'none';
    currentEditingLessonId = null;
}

function openExportModal() {
    exportModal.style.display = 'flex';
}

function closeExportModalWindow() {
    exportModal.style.display = 'none';
}

function openSettingsModal() {
    settingsModal.style.display = 'flex';
    if (adminUnlockStatus) {
        adminUnlockStatus.textContent = '';
    }

    // Show Danger Zone only for admin
    const role = getSessionRole();
    const isAdmin = role === 'admin';
    if (dangerZone) dangerZone.style.display = isAdmin ? 'block' : 'none';

    // Inject a Subject Switcher button if not present
    try {
        const injectId = 'switchSubjectBtn';
        if (!document.getElementById(injectId)) {
            const btn = document.createElement('button');
            btn.id = injectId;
            btn.textContent = 'Switch Subject';
            btn.style.cssText = `
                margin-top: var(--spacing-md);
                width: 100%;
                padding: 12px;
                background: #2c3e50;
                color: #fff;
                border: none;
                border-radius: var(--border-radius);
                cursor: pointer;
            `;
            btn.addEventListener('click', openSubjectSwitcherOverlay);
            settingsModal.appendChild(btn);
        }
    } catch (_) { /* ignore */ }
}

function closeSettingsModal() {
    settingsModal.style.display = 'none';
}

function openProfileSettingsModal() {
    const profile = getProfile();
    if (profile) {
        displayTeacherName.textContent = profile.teacherName || '-';
        displaySubject.textContent = (profile.activeSubjectName || profile.subjectName) || '-';
        displayPhone.textContent = profile.phone || '-';
    }
    profileSettingsModal.style.display = 'flex';
    settingsModal.style.display = 'none';
}

function closeProfileSettingsModal() {
    profileSettingsModal.style.display = 'none';
}

function openLoadTopicsModal() {
    loadTopicsModal.style.display = 'flex';
}

function closeLoadTopicsModalFunc() {
    loadTopicsModal.style.display = 'none';
}

function showAuthLanding() {
    authLanding.style.display = 'flex';
    loginModal.style.display = 'none';
    createProfileModal.style.display = 'none';
    // Apply overlay and body-level blur while choosing auth action
    try { authLanding.classList.add('blur-bg'); } catch (_) {}
    document.body.classList.add('blur-active');
}

function showLoginModal() {
    authLanding.style.display = 'none';
    loginModal.classList.add('blur-bg');
    document.body.classList.add('blur-active');
    loginModal.style.display = 'flex';
    loginTeacherNameInput.focus();
}

// Subject switcher overlay as a multi-step wizard
function openSubjectSwitcherOverlay() {
    const prof = getProfile();
    let selectedLevel = prof?.activeLevelName || '';
    let selectedSubject = '';
    let isManualSubject = false;
    let topicsList = [];
    let currentStep = 1; // 1: Level, 2: Subject, 3: Topics

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    const panel = document.createElement('div');
    panel.style.cssText = 'background: #fff; border-radius: 8px; padding: 20px; width: 560px; max-width: 95vw; box-shadow: 0 4px 16px rgba(0,0,0,0.2);';

    const title = document.createElement('h3');
    title.textContent = 'Subject Setup Wizard';
    title.style.marginTop = '0';
    panel.appendChild(title);

    // Step containers
    const step1 = document.createElement('div');
    const step2 = document.createElement('div');
    const step3 = document.createElement('div');

    // Step 1: Level selection
    const levelLabel = document.createElement('p');
    levelLabel.textContent = 'Step 1: Select Level';
    levelLabel.style.cssText = 'color:#666; margin:8px 0;';
    step1.appendChild(levelLabel);
    const levelWrap = document.createElement('div');
    levelWrap.style.cssText = 'display:grid; grid-template-columns: repeat(2, 1fr); gap:8px; margin-bottom:12px;';
    levelsList.forEach(lvl => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = lvl;
        btn.style.cssText = 'padding:10px; border:2px solid #ddd; background:#f9f9f9; border-radius:6px; cursor:pointer;';
        if (lvl === selectedLevel) { btn.style.borderColor = '#3498db'; btn.style.background = '#e3f2fd'; }
        btn.addEventListener('click', () => {
            selectedLevel = lvl;
            levelWrap.querySelectorAll('button').forEach(b => { b.style.borderColor = '#ddd'; b.style.background = '#f9f9f9'; });
            btn.style.borderColor = '#3498db'; btn.style.background = '#e3f2fd';
            updateNavButtons();
        });
        levelWrap.appendChild(btn);
    });
    step1.appendChild(levelWrap);

    // Step 2: Subject selection (grid + manual at bottom)
    const subjLabel = document.createElement('p');
    subjLabel.textContent = 'Step 2: Select Subject';
    subjLabel.style.cssText = 'color:#666; margin:8px 0;';
    step2.appendChild(subjLabel);
    const subjGrid = document.createElement('div');
    subjGrid.style.cssText = 'display:grid; grid-template-columns: repeat(2, 1fr); gap:8px;';
    vocationalSubjects.forEach(name => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = name;
        btn.style.cssText = 'padding:10px; border:2px solid #ddd; background:#fff; border-radius:6px; cursor:pointer; text-align:left;';
        btn.addEventListener('click', () => {
            selectedSubject = name;
            isManualSubject = false;
            subjGrid.querySelectorAll('button').forEach(b => { b.style.borderColor = '#ddd'; b.style.background = '#fff'; b.style.color = '#000'; });
            btn.style.borderColor = '#2c3e50'; btn.style.background = '#2c3e50'; btn.style.color = '#fff';
            updateNavButtons();
        });
        subjGrid.appendChild(btn);
    });
    step2.appendChild(subjGrid);
    const manualWrap = document.createElement('div');
    manualWrap.style.cssText = 'display:flex; gap:8px; margin-top:12px;';
    const manualInput = document.createElement('input');
    manualInput.type = 'text';
    manualInput.placeholder = 'Or enter a new subject...';
    manualInput.style.cssText = 'flex:1; padding:10px; border:1px solid #ddd; border-radius:6px;';
    const manualBtn = document.createElement('button');
    manualBtn.textContent = 'Add Subject';
    manualBtn.style.cssText = 'padding:10px 12px; background:#27ae60; color:#fff; border:none; border-radius:6px; cursor:pointer;';
    manualBtn.addEventListener('click', () => {
        const name = manualInput.value.trim();
        if (!name) { alert('Enter a subject name.'); return; }
        selectedSubject = name;
        isManualSubject = true;
        subjGrid.querySelectorAll('button').forEach(b => { b.style.borderColor = '#ddd'; b.style.background = '#fff'; b.style.color = '#000'; });
        updateNavButtons();
    });
    manualWrap.appendChild(manualInput);
    manualWrap.appendChild(manualBtn);
    step2.appendChild(manualWrap);

    // Step 3: Topics preview/add
    const topicsLabel = document.createElement('p');
    topicsLabel.textContent = 'Step 3: Review/Add Topics';
    topicsLabel.style.cssText = 'color:#666; margin:12px 0 8px 0;';
    step3.appendChild(topicsLabel);
    const topicsContainer = document.createElement('div');
    topicsContainer.style.cssText = 'border:1px solid #ddd; border-radius:6px; padding:10px; max-height:220px; overflow:auto; background:#f9f9f9;';
    step3.appendChild(topicsContainer);
    const addTopicRow = document.createElement('div');
    addTopicRow.style.cssText = 'display:flex; gap:8px; margin-top:10px;';
    const newTopicInput = document.createElement('input');
    newTopicInput.type = 'text';
    newTopicInput.placeholder = 'Add a topic...';
    newTopicInput.style.cssText = 'flex:1; padding:10px; border:1px solid #ddd; border-radius:6px;';
    const addTopicBtn = document.createElement('button');
    addTopicBtn.textContent = '+ Add';
    addTopicBtn.style.cssText = 'padding:10px 12px; background:#3498db; color:#fff; border:none; border-radius:6px; cursor:pointer;';
    addTopicBtn.addEventListener('click', () => {
        const t = newTopicInput.value.trim();
        if (!t) return;
        topicsList.push(t);
        newTopicInput.value = '';
        renderTopicsList();
        updateNavButtons();
    });
    addTopicRow.appendChild(newTopicInput);
    addTopicRow.appendChild(addTopicBtn);
    step3.appendChild(addTopicRow);

    panel.appendChild(step1);
    panel.appendChild(step2);
    panel.appendChild(step3);

    // Navigation controls
    const nav = document.createElement('div');
    nav.style.cssText = 'display:flex; gap:8px; margin-top:12px;';
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.className = 'btn btn-secondary';
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.className = 'btn btn-primary';
    nextBtn.style.cssText = 'margin-left:auto;';
    const activateBtn = document.createElement('button');
    activateBtn.textContent = 'Activate';
    activateBtn.className = 'btn btn-primary';
    activateBtn.style.cssText = 'display:none;';
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.style.cssText = '';
    nav.appendChild(cancelBtn);
    nav.appendChild(backBtn);
    nav.appendChild(nextBtn);
    nav.appendChild(activateBtn);
    panel.appendChild(nav);

    function goToStep(step) {
        currentStep = step;
        step1.style.display = step === 1 ? 'block' : 'none';
        step2.style.display = step === 2 ? 'block' : 'none';
        step3.style.display = step === 3 ? 'block' : 'none';
        nextBtn.style.display = step < 3 ? 'inline-block' : 'none';
        activateBtn.style.display = step === 3 ? 'inline-block' : 'none';
        backBtn.style.display = step > 1 ? 'inline-block' : 'none';
        updateNavButtons();
        if (step === 3) {
            renderTopicsPreview();
        }
    }

    function updateNavButtons() {
        if (currentStep === 1) {
            nextBtn.disabled = !selectedLevel;
        } else if (currentStep === 2) {
            nextBtn.disabled = !selectedSubject;
        } else {
            // Step 3: If manual subject or no defaults, require topics
            const defaults = (typeof getDefaultLessonsForSubject === 'function' && selectedSubject) ? getDefaultLessonsForSubject(selectedSubject) : [];
            const hasDefaults = Array.isArray(defaults) && defaults.length > 0;
            const requireTopics = isManualSubject || !hasDefaults;
            activateBtn.disabled = requireTopics ? topicsList.length === 0 : false;
        }
    }

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) goToStep(currentStep - 1);
    });
    nextBtn.addEventListener('click', () => {
        if (currentStep === 1) {
            if (!selectedLevel) { alert('Please select a level.'); return; }
            goToStep(2);
        } else if (currentStep === 2) {
            if (!selectedSubject) { alert('Please select or add a subject.'); return; }
            goToStep(3);
        }
    });
    cancelBtn.addEventListener('click', () => document.body.removeChild(overlay));

    activateBtn.addEventListener('click', async () => {
        if (!selectedLevel) { alert('Please select a level.'); return; }
        if (!selectedSubject) { alert('Please select or add a subject.'); return; }
        const defaults = (typeof getDefaultLessonsForSubject === 'function') ? getDefaultLessonsForSubject(selectedSubject) : [];
        const hasDefaults = Array.isArray(defaults) && defaults.length > 0;
        if (!hasDefaults && topicsList.length === 0) {
            alert('No default topics found. Please add topics before activating.');
            return;
        }
        showGlobalLoader?.('Activating subject...', 'Applying selection and loading topics');
        const id = selectedSubject.toLowerCase().replace(/\s+/g, '-');
        const prof2 = getProfile();
        prof2.subjects = Array.isArray(prof2.subjects) ? prof2.subjects : [];
        const existingEntry = prof2.subjects.find(s => s.name === selectedSubject);
        const isNewSubject = !existingEntry;
        if (isNewSubject) {
            prof2.subjects.push({ id, name: selectedSubject, level: selectedLevel });
        } else {
            prof2.subjects = prof2.subjects.map(s => s.name === selectedSubject ? { ...s, level: selectedLevel } : s);
        }
        prof2.activeSubjectName = selectedSubject;
        prof2.activeLevelName = selectedLevel;
        saveProfile(prof2);
        if (hasDefaults && isNewSubject) {
            await seedInitialLessons(selectedSubject);
        }
        if (topicsList.length > 0) {
            await createLessonsForSubjectFromNames(selectedSubject, topicsList);
        }
        await renderAllColumns();
        hideGlobalLoader?.();
        document.body.removeChild(overlay);
    });

    overlay.appendChild(panel);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) document.body.removeChild(overlay); });
    document.body.appendChild(overlay);

    function renderTopicsPreview() {
        topicsList = [];
        try {
            const defaults = (typeof getDefaultLessonsForSubject === 'function' && selectedSubject) ? getDefaultLessonsForSubject(selectedSubject) : [];
            if (defaults && defaults.length > 0 && !isManualSubject) {
                topicsList = defaults.map(d => d.topic).filter(Boolean);
            }
        } catch (_) {}
        renderTopicsList();
    }

    function renderTopicsList() {
        topicsContainer.innerHTML = '';
        if (!selectedSubject) {
            topicsContainer.innerHTML = '<p style="color:#888;">Select a subject to view topics.</p>';
            return;
        }
        if (topicsList.length === 0) {
            topicsContainer.innerHTML = '<p style="color:#888;">No topics listed. Add topics above.</p>';
            return;
        }
        const fragment = document.createDocumentFragment();
        topicsList.forEach((t, idx) => {
            const row = document.createElement('div');
            row.style.cssText = 'display:flex; align-items:center; justify-content:space-between; padding:6px 8px; background:#fff; border:1px solid #eee; border-radius:6px; margin-bottom:6px;';
            const span = document.createElement('span');
            span.textContent = `${idx + 1}. ${t}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.style.cssText = 'padding:4px 8px; font-size:12px; background:#ff6b6b; color:#fff; border:none; border-radius:4px; cursor:pointer;';
            removeBtn.addEventListener('click', () => {
                topicsList.splice(idx, 1);
                renderTopicsList();
                updateNavButtons();
            });
            row.appendChild(span);
            row.appendChild(removeBtn);
            fragment.appendChild(row);
        });
        topicsContainer.appendChild(fragment);
    }

    // Initialize wizard
    goToStep(1);
}

function setActiveSubject(name) {
    const prof = getProfile();
    if (!prof) return;
    prof.activeSubjectName = name || '';
    // Also set active level from stored subject entry if available
    if (Array.isArray(prof.subjects)) {
        const found = prof.subjects.find(s => s.name === name);
        if (found && found.level) {
            prof.activeLevelName = found.level;
        }
    }
    saveProfile(prof);
    updateHeaderWithTeacherInfo();
    renderAllColumns?.();
}

// Simple modal to change active subject among existing subjects
async function openChangeSubjectModal() {
    const prof = getProfile();
    let subjects = Array.isArray(prof?.subjects) ? prof.subjects.slice() : [];
    // Include legacy subject fields if not present in the array
    const legacyName = prof?.activeSubjectName || prof?.subjectName || prof?.subject || '';
    if (legacyName && !subjects.find(s => s.name === legacyName)) {
        const id = legacyName.toLowerCase().replace(/\s+/g, '-');
        subjects.push({ id, name: legacyName, level: prof?.activeLevelName || prof?.classroom || '' });
    }
    // Include any subjects inferred from existing lessons
    try {
        const lessons = await (typeof getAllLessons === 'function' ? getAllLessons() : Promise.resolve([]));
        const lessonSubjects = new Set();
        lessons.forEach(l => { const n = (l.subjectName || '').trim(); if (n) lessonSubjects.add(n); });
        lessonSubjects.forEach(n => {
            if (!subjects.find(s => s.name === n)) {
                const id = n.toLowerCase().replace(/\s+/g, '-');
                // Try to pick level if exists in profile subjects
                const match = (Array.isArray(prof?.subjects) ? prof.subjects : []).find(s => s.name === n);
                subjects.push({ id, name: n, level: match?.level || '' });
            }
        });
    } catch (_) { /* ignore */ }
    if (subjects.length === 0) {
        alert('No subjects added yet. Use Add Subject first.');
        return;
    }
    const activeName = prof?.activeSubjectName || '';
    const sorted = subjects.slice().sort((a, b) => {
        if (a.name === activeName && b.name !== activeName) return -1;
        if (b.name === activeName && a.name !== activeName) return 1;
        return (a.name || '').localeCompare(b.name || '');
    });
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    const panel = document.createElement('div');
    panel.style.cssText = 'background: #fff; border-radius: 8px; padding: 20px; width: 480px; max-width: 95vw; box-shadow: 0 4px 16px rgba(0,0,0,0.2);';
    const title = document.createElement('h3');
    title.textContent = 'Change Active Subject';
    title.style.marginTop = '0';
    panel.appendChild(title);
    const list = document.createElement('div');
    list.style.cssText = 'display:grid; grid-template-columns: 1fr; gap:8px;';
    // Dedupe by subject name before rendering
    const seen = new Set();
    sorted.forEach(s => {
        if (seen.has(s.name)) return; seen.add(s.name);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = `${s.name} • ${s.level || '—'}`;
        const isActive = s.name === activeName;
        btn.style.cssText = 'padding:10px; border:2px solid #ddd; background:#fff; border-radius:6px; cursor:pointer; text-align:left; display:flex; align-items:center; justify-content:space-between;';
        if (isActive) {
            btn.style.borderColor = '#27ae60';
            btn.style.background = '#e9f7ef';
        }
        if (isActive) {
            const badge = document.createElement('span');
            badge.textContent = 'Active';
            badge.style.cssText = 'margin-left:8px; padding:2px 6px; font-size:12px; color:#fff; background:#27ae60; border-radius:10px;';
            btn.appendChild(badge);
        }
        btn.addEventListener('click', () => {
            setActiveSubject(s.name);
            document.body.removeChild(overlay);
        });
        list.appendChild(btn);
    });
    panel.appendChild(list);
    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex; gap:8px; margin-top:12px;';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.className = 'btn btn-secondary';
    closeBtn.addEventListener('click', () => document.body.removeChild(overlay));
    actions.appendChild(closeBtn);
    panel.appendChild(actions);
    overlay.appendChild(panel);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) document.body.removeChild(overlay); });
    document.body.appendChild(overlay);
}

function addSubject(name) {
    const prof = getProfile();
    if (!prof) return;
    const id = (name || '').toLowerCase().replace(/\s+/g, '-');
    prof.subjects = Array.isArray(prof.subjects) ? prof.subjects : [];
    if (!prof.subjects.find(s => s.name === name)) {
        prof.subjects.push({ id, name });
    }
    prof.activeSubjectName = name;
    saveProfile(prof);
}

// Create lessons from a simple topic name list for a subject
async function createLessonsForSubjectFromNames(subjectName, topicNames = []) {
    const unique = [];
    const seen = new Set();
    topicNames.forEach(t => { const k = (t || '').trim().toLowerCase(); if (k && !seen.has(k)) { seen.add(k); unique.push(t.trim()); } });
    for (const t of unique) {
        const lesson = {
            topic: t,
            week: null,
            status: 'not-started',
            periodsPlanned: 2,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: '',
            subjectName: subjectName
        };
        try { await saveLessonToDB(lesson); } catch (_) {}
    }
}

function showCreateProfileModal() {
    authLanding.style.display = 'none';
    createProfileModal.classList.add('blur-bg');
    document.body.classList.add('blur-active');
    createProfileModal.style.display = 'flex';
    teacherNameInput.focus();
}

function openAdminPanel() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.classList.remove('visible');
    if (adminPanelModal) adminPanelModal.style.display = 'flex';
}

function openAdminDashboard() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.classList.remove('visible');
    if (adminPanelModal) adminPanelModal.style.display = 'none';
    if (adminDashboard) adminDashboard.style.display = 'block';
    // Auto-load users if admin backend configured
    try {
        const role = getSessionRole?.() || 'user';
        if (role === 'admin') {
            loadAdminUsers?.();
        }
    } catch (_) {}
}

function closeAdminDashboard() {
    if (adminDashboard) adminDashboard.style.display = 'none';
}

function closeAdminPanel() {
    if (adminPanelModal) adminPanelModal.style.display = 'none';
}

closeAdminPanelBtn?.addEventListener('click', closeAdminPanel);
backFromAdminBtn?.addEventListener('click', () => {
    closeAdminPanel();
    showAuthLanding();
});

adminDashboardBtn?.addEventListener('click', () => {
    openAdminDashboard();
});

// Header buttons: change vs add subject
subjectSwitchHeaderBtn?.addEventListener('click', openChangeSubjectModal);
const addSubjectHeaderBtn = document.getElementById('addSubjectHeaderBtn');
addSubjectHeaderBtn?.addEventListener('click', openSubjectSwitcherOverlay);
viewTopicsBtn?.addEventListener('click', openViewTopicsModal);

backFromAdminDashboardBtn?.addEventListener('click', () => {
    closeAdminDashboard();
    showAuthLanding();
});

async function loadAdminUsers() {
    try {
        showSyncIndicator('⏳ Loading users...');
        const result = await (window.adminApi?.listUsers?.() || Promise.resolve({ success: false, error: 'Admin backend not connected' }));
        if (!result.success) {
            alert('❌ ' + (result.error || 'Failed to load users'));
            return;
        }
        const users = result.users || [];
        adminStatTotalUsers.textContent = users.length;
        adminStatActiveToday.textContent = result.activeToday ?? '–';
        adminStatCloudLessons.textContent = result.cloudLessons ?? '–';
        adminUsersTableBody.innerHTML = users.length ? users.map(u => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${u.uid}</td>
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${u.email || '-'}</td>
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${(u.teacherName || '-')}</td>
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${(u.subject || '-')}</td>
            </tr>
        `).join('') : '<tr><td colspan="4" style="padding:16px; color: var(--text-secondary);">No users found</td></tr>';
        showSyncIndicator('✅ Users loaded');
    } catch (err) {
        console.error('Admin Load Users error:', err);
        alert('❌ Failed to load users: ' + err.message);
    }
}

adminLoadUsersBtn?.addEventListener('click', loadAdminUsers);

adminDeleteCloudBtn?.addEventListener('click', async () => {
    const confirmText = (adminConfirmDeleteCloudInput?.value || '').trim();
    const result = await (window.cloudCleanup?.deleteMyCloudLessons?.({ confirmText }) || Promise.resolve({ success: false, error: 'Cleanup helper unavailable' }));
    if (result.success) {
        alert(`✅ Deleted ${result.deleted} cloud lessons for your account.`);
        await clearAllLessons().catch(() => {});
        await renderAllColumns().catch(() => {});
    } else {
        alert('❌ Could not delete cloud lessons: ' + (result.error || 'Unknown error'));
    }
});

adminDeleteAccountBtn?.addEventListener('click', async () => {
    const confirmText = (adminConfirmDeleteAccountInput?.value || '').trim();
    const result = await (window.cloudCleanup?.deleteMyAccount?.({ confirmText }) || Promise.resolve({ success: false, error: 'Account helper unavailable' }));
    if (result.success) {
        alert('✅ Your account has been deleted. The app will reset.');
        await resetAllData();
    } else {
        alert('❌ Could not delete account: ' + (result.error || 'Unknown error'));
    }
});

function openLoginModal() {
    loginModal.style.display = 'flex';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
}

function saveProfile(profileData) {
    localStorage.setItem('teacherProfile', JSON.stringify(profileData));
    updateHeaderWithTeacherInfo();
    closeLoginModal();
}

function getProfile() {
    const profile = localStorage.getItem('teacherProfile');
    return profile ? JSON.parse(profile) : null;
}

// Ensure profile model is updated for multi-subject support at startup
(function ensureProfileSubjectModelStartup(){
    try {
        const raw = localStorage.getItem('teacherProfile');
        if (!raw) return;
        const prof = JSON.parse(raw);
        let changed = false;
        if (!Array.isArray(prof.subjects)) {
            const name = prof.subjectName || prof.subject || '';
            const id = (name || '').toLowerCase().replace(/\s+/g, '-');
            prof.subjects = name ? [{ id, name }] : [];
            changed = true;
        }
        if (!prof.activeSubjectName && (prof.subjectName || prof.subject || (prof.subjects[0]?.name))) {
            prof.activeSubjectName = prof.subjectName || prof.subject || prof.subjects[0]?.name || '';
            changed = true;
        }
        if (changed) {
            localStorage.setItem('teacherProfile', JSON.stringify(prof));
        }
    } catch (_) { /* ignore */ }
})();

function updateHeaderWithTeacherInfo() {
    const profile = getProfile();
    if (profile && (profile.teacherName || profile.email)) {
        const parts = [];
        if (profile.teacherName) parts.push(`👤 ${profile.teacherName}`);
        const subj = profile.activeSubjectName || profile.subjectName;
        if (subj) parts.push(`📖 ${subj}`);
        if (profile.activeLevelName) parts.push(`⚙️ ${profile.activeLevelName}`);
        if (profile.schoolName) parts.push(`🏫 ${profile.schoolName}`);
        if (profile.classroom) parts.push(`🎓 ${profile.classroom}`);
        teacherInfo.textContent = parts.join(' • ');
        // Ensure any previously injected quick switch button is removed
        try {
            const existing = document.getElementById('subjectQuickSwitch');
            if (existing && existing.parentNode) {
                existing.parentNode.removeChild(existing);
            }
        } catch (_) { /* ignore */ }
        teacherInfo.style.display = 'block';
    } else {
        teacherInfo.style.display = 'none';
    }
}

function populateProfileForm() {
    const profile = getProfile();
    if (profile) {
        teacherNameInput.value = profile.teacherName || '';
        subjectNameInput.value = profile.activeSubjectName || profile.subjectName || '';
        passwordInput.value = profile.password || '';
        confirmPasswordInput.value = profile.password || '';
        schoolNameInput.value = profile.schoolName || '';
        emailInput.value = profile.email || '';
        phoneInput.value = profile.phone || '';
        classroomInput.value = profile.classroom || '';
    }
}

function openDeleteModal(lessonId, topicName) {
    currentDeletingLessonId = lessonId;
    deleteTopicName.textContent = topicName;
    deleteModal.style.display = 'flex';
}

function closeDeleteModal() {
    deleteModal.style.display = 'none';
    currentDeletingLessonId = null;
}

// ========================
// FORM POPULATION
// ========================

async function populateFormWithLesson(lessonId) {
    const lesson = await getLessonByID(lessonId);
    if (lesson) {
        topicInput.value = lesson.topic || '';
        weekInput.value = lesson.week || '';
        periodsPlannedInput.value = lesson.periodsPlanned || 2;
        periodsUsedInput.value = lesson.periodsUsed || 0;
        lastTaughtInput.value = lesson.lastTaught || '';
        nextStartInput.value = lesson.nextStart || '';
        remarksInput.value = lesson.remarks || '';
        statusSelect.value = lesson.status || 'not-started';
    }
}

// ========================
// LESSON CARD RENDERING
// ========================

function createLessonCard(lesson) {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.dataset.id = lesson.id;
    card.dataset.status = lesson.status;
    card.draggable = true;

    const progress = lesson.periodsPlanned > 0 
        ? Math.round((lesson.periodsUsed / lesson.periodsPlanned) * 100) 
        : 0;

    const lastTaughtDisplay = lesson.lastTaught ? new Date(lesson.lastTaught).toLocaleDateString() : 'Not yet';

    card.innerHTML = `
        <div class="card-title">${escapeHTML(lesson.topic)}</div>
        
        <div class="card-badges">
            ${lesson.week ? `<span class="badge badge-week">Week ${lesson.week}</span>` : ''}
            <span class="badge badge-periods">${lesson.periodsUsed}/${lesson.periodsPlanned} periods</span>
            <span class="badge" style="background-color: ${getProgressColor(progress)}; color: white;">${progress}%</span>
        </div>

        <div class="card-meta">
            <div class="card-meta-item">
                <span>📅 Last taught:</span>
                <strong>${lastTaughtDisplay}</strong>
            </div>
        </div>

        ${lesson.remarks ? `<div class="card-remarks">${escapeHTML(lesson.remarks)}</div>` : ''}

        <div class="card-actions">
            <button class="card-action-btn edit-btn" data-id="${lesson.id}" title="Edit">✏️</button>
            <button class="card-action-btn delete-btn" data-id="${lesson.id}" title="Delete">🗑️</button>
        </div>
    `;

    return card;
}

function getProgressColor(percentage) {
    if (percentage === 0) return '#95a5a6';
    if (percentage < 50) return '#f39c12';
    if (percentage < 100) return '#3498db';
    return '#27ae60';
}

// ========================
// COLUMN RENDERING
// ========================

async function renderAllColumns() {
    const allLessons = await getAllLessons();
    // Filter by active subject (or single subject in profile)
    let subjectFilter = '';
    try {
        const profile = getProfile?.();
        subjectFilter = profile?.activeSubjectName || profile?.subjectName || profile?.subject || '';
    } catch (_) { /* ignore */ }
    
    const statuses = ['not-started', 'in-progress', 'completed'];
    
    for (const status of statuses) {
        const columnElement = document.getElementById(`column-${status}`);
        const columnHeader = document.querySelector(`[data-status="${status}"] .column-header`);
        const countBadge = columnHeader.querySelector('.column-count');
        
        const lessonsInStatus = allLessons.filter(l => {
            const matchesStatus = l.status === status;
            const matchesSubject = !subjectFilter || (l.subjectName || '') === subjectFilter;
            return matchesStatus && matchesSubject;
        });
        
        columnElement.innerHTML = '';
        
        lessonsInStatus.forEach(lesson => {
            const card = createLessonCard(lesson);
            columnElement.appendChild(card);
            
            // Add event listeners to card buttons
            card.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openLessonModal(lesson.id);
            });
            
            card.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openDeleteModal(lesson.id, lesson.topic);
            });
            
            // Add drag listeners
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragend', handleDragEnd);
        });
        
        countBadge.textContent = lessonsInStatus.length;
    }
    
    // Setup column drag targets
    setupColumnDragTargets();
}

// ========================
// DRAG & DROP
// ========================

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
    }
}

function setupColumnDragTargets() {
    const columnContents = document.querySelectorAll('.column-content');
    
    columnContents.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            column.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
        });
        
        column.addEventListener('dragleave', (e) => {
            if (e.target === column) {
                column.style.backgroundColor = '';
            }
        });
        
        column.addEventListener('drop', async (e) => {
            e.preventDefault();
            column.style.backgroundColor = '';
            
            if (draggedElement) {
                const lessonId = parseInt(draggedElement.dataset.id);
                const newStatus = column.id.replace('column-', '');
                
                // Update lesson status
                const lesson = await getLessonByID(lessonId);
                if (lesson) {
                    lesson.status = newStatus;
                    try {
                        showSyncIndicator('🔄 Moving topic...');
                        await saveLessonToDB(lesson);
                        await renderAllColumns();
                        showSyncIndicator('✅ Topic moved');
                    } catch (err) {
                        console.error('Error moving topic:', err);
                        showSyncIndicator('❌ Move failed');
                    }
                }
            }
        });
    });
}

// ========================
// EXPORT FUNCTIONS
// ========================

async function importTopicsFromCSV(csvText) {
    try {
        showGlobalLoader('Importing topics...', 'Parsing CSV and saving');
        const lines = csvText.trim().split('\n');
        const header = lines[0].split(',').map(h => h.trim());
        
        let importedCount = 0;
        const total = Math.max(0, lines.length - 1);
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length < 1 || !values[0]) continue;
            
            const lesson = {
                topic: values[0] || 'Untitled',
                week: parseInt(values[1]) || 1,
                periodsPlanned: parseInt(values[2]) || 2,
                periodsUsed: parseInt(values[3]) || 0,
                status: values[4] || 'not-started',
                lastTaught: values[5] || '',
                nextStart: values[6] || '',
                remarks: values[7] || ''
            };
            
            showSyncIndicator('📥 Importing topics...');
            await saveLessonToDB(lesson);
            importedCount++;
            updateGlobalLoader('Importing topics...', `Saved ${importedCount}/${total}`);
        }
        
        alert(`Successfully imported ${importedCount} topics!`);
        try {
            showSyncIndicator('🔄 Updating view...');
            await renderAllColumns();
            showSyncIndicator('✅ Topics imported');
        } catch (error) {
            console.error('Error re-rendering after import:', error);
            showSyncIndicator('❌ Render failed');
        }
    } catch (error) {
        console.error('Error importing CSV:', error);
        alert('Error importing file. Check console for details.');
    } finally {
        hideGlobalLoader();
    }
}

async function exportToCSV() {
    const lessons = await getAllLessons();
    
    // Sort by week
    lessons.sort((a, b) => (a.week || 0) - (b.week || 0));

    // Profile details for header metadata
    const profile = getProfile() || {};
    const teacherName = profile.teacherName || '';
    const subjectName = profile.subjectName || '';
    const schoolName = profile.schoolName || '';
    const levelName = profile.classroom || '';
    const phoneNumber = profile.phone || '';
    const generatedDate = new Date().toLocaleDateString();

    const escCsv = (val) => {
        const s = String(val || '');
        return '"' + s.replace(/"/g, '""') + '"';
    };

    // Metadata header rows
    let csv = '';
    csv += `Teacher Name,${escCsv(teacherName)}\n`;
    csv += `Subject,${escCsv(subjectName)}\n`;
    csv += `School,${escCsv(schoolName)}\n`;
    csv += `Level,${escCsv(levelName)}\n`;
    csv += `Phone,${escCsv(phoneNumber)}\n`;
    csv += `Generated,${escCsv(generatedDate)}\n\n`;

    // Column headers
    csv += 'Topic,Week,Status,Periods Planned,Periods Used,% Complete,Last Taught,Next Start,Remarks\n';
    
    lessons.forEach(lesson => {
        const progress = lesson.periodsPlanned > 0 
            ? Math.round((lesson.periodsUsed / lesson.periodsPlanned) * 100) 
            : 0;
        const lastTaught = lesson.lastTaught || '';
        
        const row = [
            `"${lesson.topic.replace(/"/g, '""')}"`,
            lesson.week || '',
            lesson.status,
            lesson.periodsPlanned,
            lesson.periodsUsed,
            progress + '%',
            lastTaught,
            `"${lesson.nextStart.replace(/"/g, '""')}"`,
            `"${lesson.remarks.replace(/"/g, '""')}"`
        ].join(',');
        
        csv += row + '\n';
    });
    
    // Build descriptive filename: teaching-progress-<teacher>-YYYY-MM-DD.csv
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStamp = `${yyyy}-${mm}-${dd}`;
    const safeTeacher = (teacherName || 'unknown')
        .toString()
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
    const filename = `teaching-progress-${safeTeacher}-${dateStamp}.csv`;
    downloadFile(csv, filename, 'text/csv');
    closeExportModalWindow();
}

async function exportToPDF() {
    const lessons = await getAllLessons();
    
    // Sort by week
    lessons.sort((a, b) => (a.week || 0) - (b.week || 0));
    
    // Get profile details for report header
    const profile = getProfile();
    const teacherName = (profile?.teacherName) || '-';
    const subjectName = (profile?.subjectName) || '-';
    const schoolName = (profile?.schoolName) || '-';
    const levelName = (profile?.classroom) || '-';
    const phoneNumber = (profile?.phone) || '-';

    const today = new Date().toLocaleDateString();
    const totalTopics = lessons.length;
    const completed = lessons.filter(l => l.status === 'completed').length;
    const inProgress = lessons.filter(l => l.status === 'in-progress').length;
    const notStarted = lessons.filter(l => l.status === 'not-started').length;
    
    // Pull system footer content from the app footer for inclusion
    const systemFooterEl = document.querySelector('.app-footer');
    const systemFooterHTML = systemFooterEl ? systemFooterEl.innerHTML : '';
    
    let html = `
<!DOCTYPE html>
<html>
<head>
    <title>Teaching Progress Summary</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        .summary { background: #ecf0f1; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .summary-item { display: inline-block; margin-right: 30px; }
        .summary-count { font-size: 24px; font-weight: bold; color: #3498db; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background: #2c3e50; color: white; padding: 12px; text-align: left; }
        td { border-bottom: 1px solid #bdc3c7; padding: 10px; }
        tr:nth-child(even) { background: #f5f5f5; }
        .status-completed { color: #27ae60; font-weight: bold; }
        .status-in-progress { color: #f39c12; font-weight: bold; }
        .status-not-started { color: #7f8c8d; }
        .footer { margin-top: 30px; font-size: 12px; color: #7f8c8d; border-top: 1px solid #bdc3c7; padding-top: 10px; }
    </style>
</head>
<body>
    <h1>📚 Teaching Progress Summary Report</h1>
    <div style="background:#f7f9fc; padding: 12px 16px; border: 1px solid #e1e8f0; border-radius: 8px; margin: 12px 0;">
        <p style="margin:4px 0"><strong>Teacher:</strong> ${escapeHTML(teacherName)}</p>
        <p style="margin:4px 0"><strong>Subject:</strong> ${escapeHTML(subjectName)}</p>
        <p style="margin:4px 0"><strong>School:</strong> ${escapeHTML(schoolName)}</p>
        <p style="margin:4px 0"><strong>Level:</strong> ${escapeHTML(levelName)}</p>
        <p style="margin:4px 0"><strong>Phone:</strong> ${escapeHTML(phoneNumber)}</p>
        <p style="margin:4px 0"><strong>Generated:</strong> ${today}</p>
    </div>
    
    <div class="summary">
        <div class="summary-item">
            <div class="summary-count" style="color: #3498db;">${totalTopics}</div>
            <div>Total Topics</div>
        </div>
        <div class="summary-item">
            <div class="summary-count" style="color: #27ae60;">${completed}</div>
            <div>Completed</div>
        </div>
        <div class="summary-item">
            <div class="summary-count" style="color: #f39c12;">${inProgress}</div>
            <div>In Progress</div>
        </div>
        <div class="summary-item">
            <div class="summary-count" style="color: #95a5a6;">${notStarted}</div>
            <div>Not Started</div>
        </div>
    </div>
    
    <table>
        <thead>
            <tr>
                <th>Week</th>
                <th>Topic</th>
                <th>Status</th>
                <th>Periods</th>
                <th>% Complete</th>
                <th>Last Taught</th>
                <th>Next Start Point</th>
            </tr>
        </thead>
        <tbody>
`;
    
    lessons.forEach(lesson => {
        const progress = lesson.periodsPlanned > 0 
            ? Math.round((lesson.periodsUsed / lesson.periodsPlanned) * 100) 
            : 0;
        const lastTaught = lesson.lastTaught ? new Date(lesson.lastTaught).toLocaleDateString() : '-';
        const statusClass = `status-${lesson.status}`;
        
        html += `
            <tr>
                <td>${lesson.week || '-'}</td>
                <td>${escapeHTML(lesson.topic)}</td>
                <td><span class="${statusClass}">${lesson.status.replace('-', ' ')}</span></td>
                <td>${lesson.periodsUsed}/${lesson.periodsPlanned}</td>
                <td>${progress}%</td>
                <td>${lastTaught}</td>
                <td>${escapeHTML(lesson.nextStart)}</td>
            </tr>
        `;
    });
    
    html += `
        </tbody>
    </table>
    
    <div class="footer">
        <div>${systemFooterHTML}</div>
        <p style="margin-top:8px;">This report was generated from the Teaching Progress Tracker PWA.</p>
        <p>For offline access and tracking, download the app or add to home screen on mobile.</p>
    </div>
</body>
</html>
    `;
    // Build descriptive filename: teaching-progress-<teacher>-YYYY-MM-DD.html
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStamp = `${yyyy}-${mm}-${dd}`;
    const safeTeacher = (teacherName || 'unknown')
        .toString()
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
    const filename = `teaching-progress-${safeTeacher}-${dateStamp}.html`;
    downloadFile(html, filename, 'text/html');
    closeExportModalWindow();
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ========================
// UTILITY FUNCTIONS
// ========================

function escapeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========================
// EVENT LISTENERS
// ========================

// Modal close buttons
closeModalBtn.addEventListener('click', closeLessonModal);
cancelBtn.addEventListener('click', closeLessonModal);
window.addEventListener('click', (e) => {
    if (e.target === lessonModal) {
        closeLessonModal();
    }
    if (e.target === exportModal) {
        closeExportModalWindow();
    }
    if (e.target === settingsModal) {
        closeSettingsModal();
    }
    if (e.target === loadTopicsModal) {
        closeLoadTopicsModalFunc();
    }
    if (e.target === loginModal) {
        closeLoginModal();
    }
    if (e.target === deleteModal) {
        closeDeleteModal();
    }
});

// Export modal
closeExportModalBtn.addEventListener('click', closeExportModalWindow);
exportCSV.addEventListener('click', exportToCSV);
exportPDF.addEventListener('click', exportToPDF);

// Load Topics modal
closeLoadTopicsModalBtn.addEventListener('click', closeLoadTopicsModalFunc);
closeLoadTopicsBtn.addEventListener('click', closeLoadTopicsModalFunc);

loadDefaultTopicsFormBtn.addEventListener('click', async () => {
    closeLoadTopicsModalFunc();
    if (confirm('Load standard curriculum? This will add topics to your current list.')) {
        showSyncIndicator('⏳ Loading curriculum...');
        showGlobalLoader('Loading default topics...', 'Applying to selected subject');
        const profile = getProfile() || {};
        const { addedCount, subject } = await seedInitialLessons(profile.subjectName);
        await renderAllColumns();
        if (addedCount > 0) {
            showSyncIndicator('✅ Curriculum loaded!');
            alert(`Loaded ${addedCount} default topics for ${subject || 'selected subject'}.`);
        } else {
            showSyncIndicator('ℹ️ No defaults for subject');
            alert(`No default topics available for ${subject || 'this subject'}.
\nYou can add topics manually or import from CSV via Load Topics.`);
            if (typeof openLoadTopicsModal === 'function') openLoadTopicsModal();
        }
        hideGlobalLoader();
    }
});

loadFromFileBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const text = await file.text();
            showSyncIndicator('⏳ Importing topics...');
            await importTopicsFromCSV(text);
            showSyncIndicator('✅ Topics imported!');
            closeLoadTopicsModalFunc();
        }
    };
    input.click();
});

// Settings modal
closeSettingsModalBtn.addEventListener('click', closeSettingsModal);
closeSettingsBtn.addEventListener('click', closeSettingsModal);

// Load Topics modal
loadTopicsBtn?.addEventListener('click', openLoadTopicsModal);
closeLoadTopicsModalBtn.addEventListener('click', closeLoadTopicsModalFunc);
closeLoadTopicsBtn.addEventListener('click', closeLoadTopicsModalFunc);

loadDefaultTopicsFormBtn.addEventListener('click', async () => {
    closeLoadTopicsModalFunc();
    if (confirm('Load standard curriculum? This will add topics to your current list.')) {
        showGlobalLoader('Loading default topics...', 'Applying to selected subject');
        const profile = getProfile() || {};
        const { addedCount, subject } = await seedInitialLessons(profile.subjectName);
        await renderAllColumns();
        if (addedCount > 0) {
            alert(`Loaded ${addedCount} default topics for ${subject || 'selected subject'}.`);
        } else {
            alert(`No default topics available for ${subject || 'this subject'}.
\nYou can add topics manually or import from CSV via Load Topics.`);
            if (typeof openLoadTopicsModal === 'function') openLoadTopicsModal();
        }
        hideGlobalLoader();
    }
});

loadFromFileBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const text = await file.text();
            await importTopicsFromCSV(text);
            closeLoadTopicsModalFunc();
        }
    };
    input.click();
});

// Export button
exportBtn.addEventListener('click', openExportModal);

// Settings button
settingsBtn.addEventListener('click', openSettingsModal);

// Danger Zone actions
if (dangerDeleteCloudBtn) {
    dangerDeleteCloudBtn.addEventListener('click', async () => {
        try {
            const confirmText = (confirmDeleteCloudInput?.value || '').trim();
            const result = await (window.cloudCleanup?.deleteMyCloudLessons?.({ confirmText }) || Promise.resolve({ success: false, error: 'Cleanup helper unavailable' }));
            if (result.success) {
                alert(`✅ Deleted ${result.deleted} cloud lessons for your account.`);
                await clearAllLessons().catch(() => {});
                await renderAllColumns().catch(() => {});
            } else {
                alert('❌ Could not delete cloud lessons: ' + (result.error || 'Unknown error'));
            }
        } catch (e) {
            console.error('Danger delete cloud error:', e);
            alert('❌ Error: ' + e.message);
        }
    });
}

if (dangerDeleteAccountBtn) {
    dangerDeleteAccountBtn.addEventListener('click', async () => {
        try {
            const confirmText = (confirmDeleteAccountInput?.value || '').trim();
            const result = await (window.cloudCleanup?.deleteMyAccount?.({ confirmText }) || Promise.resolve({ success: false, error: 'Account helper unavailable' }));
            if (result.success) {
                alert('✅ Your account has been deleted. The app will reset.');
                await resetAllData();
            } else {
                alert('❌ Could not delete account: ' + (result.error || 'Unknown error'));
            }
        } catch (e) {
            console.error('Danger delete account error:', e);
            alert('❌ Error: ' + e.message);
        }
    });
}

if (adminUnlockBtn) {
    adminUnlockBtn.addEventListener('click', () => {
        // Local admin unlock disabled; require admin login credentials
        adminUnlockStatus.textContent = 'Admin unlock is disabled. Please login with admin credentials.';
        alert('❌ Admin unlock disabled. Use admin login credentials to access Admin Dashboard.');
    });
}

// ===== Role-based UI toggles =====
function getSessionRole() {
    try {
        const data = localStorage.getItem('sessionData');
        if (!data) return 'user';
        const parsed = JSON.parse(data);
        return parsed.role || 'user';
    } catch (_) {
        return 'user';
    }
}

function applyRoleUIState() {
    const role = getSessionRole();
    const isAdmin = role === 'admin';
    if (adminDashboardBtn) adminDashboardBtn.style.display = isAdmin ? 'inline-block' : 'none';
    // Settings should be available to all users
    if (settingsBtn) settingsBtn.style.display = 'inline-block';
}

// Apply once on load
applyRoleUIState();

// Profile Settings Modal
editProfileBtn.addEventListener('click', openProfileSettingsModal);
closeProfileSettingsBtn.addEventListener('click', closeProfileSettingsModal);
backProfileSettingsBtn.addEventListener('click', () => {
    closeProfileSettingsModal();
    openSettingsModal();
});

// Edit Name
editNameBtn.addEventListener('click', () => {
    const profile = getProfile();
    const newName = prompt('Enter new teacher name:', profile.teacherName);
    if (newName && newName.trim()) {
        profile.teacherName = newName.trim();
        saveProfile(profile);
        displayTeacherName.textContent = newName;
        updateHeaderWithTeacherInfo();
        alert('✅ Name updated successfully!');
    }
});

// Edit Phone
editPhoneBtn.addEventListener('click', () => {
    const profile = getProfile();
    const newPhone = prompt('Enter new phone number:', profile.phone || '');
    if (newPhone !== null) {
        profile.phone = newPhone;
        saveProfile(profile);
        displayPhone.textContent = newPhone || '-';
        alert('✅ Phone number updated successfully!');
    }
});

// View Topic List
viewTopicListBtn.addEventListener('click', () => {
    closeProfileSettingsModal();
    openViewTopicsModal();
});

// Delete Topic
deleteTopicBtn.addEventListener('click', async () => {
    const lessons = await getAllLessons();
    if (lessons.length === 0) {
        alert('No topics to delete!');
        return;
    }
    
    // Create a modal dialog for topic selection
    const deleteDialog = document.createElement('div');
    deleteDialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const dialogContent = document.createElement('div');
    dialogContent.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 20px;
        max-width: 500px;
        max-height: 70vh;
        overflow-y: auto;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    `;
    
    let dialogHTML = `<h2 style="margin-top: 0;">Delete Topics</h2>
    <p style="color: #666; margin-bottom: 15px;">Select topics to delete or delete all:</p>
    <div style="margin-bottom: 20px;">`;
    
    // Add delete all option
    dialogHTML += `
        <button id="deleteAllBtn" style="
            width: 100%;
            padding: 12px;
            margin-bottom: 10px;
            border: 2px solid #e74c3c;
            background: #fff;
            color: #e74c3c;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: 0.3s;
        " onmouseover="this.style.background='#ffe6e6'" onmouseout="this.style.background='#fff'">
        🗑️ DELETE ALL TOPICS
        </button>
    `;
    
    // Add individual topics
    dialogHTML += `<p style="font-size: 0.9rem; color: #999; margin: 15px 0 10px 0;">Or select individual topics:</p>`;
    lessons.forEach((lesson, i) => {
        dialogHTML += `
            <button class="topic-delete-btn" data-id="${lesson.id}" data-topic="${lesson.topic}" style="
                width: 100%;
                padding: 10px;
                margin-bottom: 8px;
                border: 1px solid #ddd;
                background: #f9f9f9;
                border-radius: 4px;
                cursor: pointer;
                text-align: left;
                transition: 0.2s;
            " onmouseover="this.style.background='#ffe6e6'; this.style.borderColor='#e74c3c';" onmouseout="this.style.background='#f9f9f9'; this.style.borderColor='#ddd';">
            ${i+1}. ${lesson.topic}
            </button>
        `;
    });
    
    dialogHTML += `</div>
    <button id="closeDeleteDialogBtn" style="
        width: 100%;
        padding: 10px;
        border: 1px solid #bbb;
        background: #f0f0f0;
        border-radius: 4px;
        cursor: pointer;
    ">Cancel</button>`;
    
    dialogContent.innerHTML = dialogHTML;
    deleteDialog.appendChild(dialogContent);
    document.body.appendChild(deleteDialog);
    
    // Delete All handler
    document.getElementById('deleteAllBtn').addEventListener('click', async () => {
        if (confirm('⚠️ Delete ALL topics? This cannot be undone!')) {
            for (const lesson of lessons) {
                await deleteLessonFromDB(lesson.id);
                if (isOnline && getCurrentUser()) {
                    await deleteLessonFromCloud(lesson.id);
                }
            }
            await renderAllColumns();
            document.body.removeChild(deleteDialog);
            alert('✅ All topics deleted!');
            closeProfileSettingsModal();
        }
    });
    
    // Individual topic delete handlers
    document.querySelectorAll('.topic-delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const topicId = btn.dataset.id;
            const topicName = btn.dataset.topic;
            
            if (confirm(`Delete "${topicName}"?`)) {
                await deleteLessonFromDB(parseInt(topicId));
                if (isOnline && getCurrentUser()) {
                    await deleteLessonFromCloud(parseInt(topicId));
                }
                btn.style.opacity = '0.5';
                btn.style.textDecoration = 'line-through';
                btn.disabled = true;
                alert('✅ Topic deleted!');
                
                // Refresh after a short delay
                setTimeout(async () => {
                    await renderAllColumns();
                    document.body.removeChild(deleteDialog);
                    closeProfileSettingsModal();
                }, 500);
            }
        });
    });
    
    // Close dialog handler
    document.getElementById('closeDeleteDialogBtn').addEventListener('click', () => {
        document.body.removeChild(deleteDialog);
    });
    
    // Close dialog when clicking outside
    deleteDialog.addEventListener('click', (e) => {
        if (e.target === deleteDialog) {
            document.body.removeChild(deleteDialog);
        }
    });
});

// Next Period Schedule
nextPeriodBtn.addEventListener('click', () => {
    const period = prompt('Enter next period schedule (e.g., Week 5 - Topic: Basic Computer):', '');
    if (period && period.trim()) {
        const profile = getProfile();
        profile.nextPeriod = period;
        saveProfile(profile);
        alert('✅ Schedule updated successfully!');
    }
});

// Auth Landing
loginBtn.addEventListener('click', showLoginModal);
createProfileBtn.addEventListener('click', showCreateProfileModal);

// Login Form
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const identifier = loginTeacherNameInput.value.trim();
    const password = loginPasswordInput.value.trim();

    // Admin override: local admin login opens Admin Panel only
    if (identifier === 'DevSecure' && password === 'lukoa123') {
        try {
            createSecureSession('DevSecure', 'admin-local', 'admin');
            localStorage.setItem('adminUnlocked', 'true');
            authLanding.style.display = 'none';
            loginModal.style.display = 'none';
            // Ensure normal content stays hidden
            const mainContent = document.querySelector('.main-content');
            if (mainContent) mainContent.classList.remove('visible');
            openAdminDashboard?.();
            return;
        } catch (err) {
            alert('❌ Admin login error: ' + err.message);
            return;
        }
    }
    
    // Use security module to validate and check rate limits
    // Accept username or email; resolve username to email if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = identifier;
    if (!emailRegex.test(identifier)) {
        try {
            showGlobalLoader('Resolving account...', 'Checking username');
            email = await (window.resolveEmailForUsername?.(identifier));
        } catch (err) {
            console.warn('Username resolution failed:', err);
        } finally {
            hideGlobalLoader();
        }
    }
    const passCheck = validatePassword(password);
    if (!passCheck.valid) {
        alert('❌ ' + passCheck.error);
        recordFailedLogin();
        return;
    }
    
    try {
        // Try to login with Firebase first (cloud-based) using username-resolved email
        const firebaseResult = await loginTeacher(email, password);
        
        if (firebaseResult.success) {
            // Firebase login successful - pull data from cloud
            await clearAllLessons();
            await pullCloudDataToLocal();
            
            // Determine role from ID token custom claims
            let role = 'user';
            try {
                const tokenResult = await auth.currentUser.getIdTokenResult(true);
                if (tokenResult?.claims?.admin) role = 'admin';
            } catch (e) { /* ignore */ }
            // Create secure session with detected role
            createSecureSession(email, firebaseResult.uid, role);
            
            // Fetch teacher profile from Firestore and save locally
            const teacherDoc = await (window.getTeacherProfile?.(firebaseResult.uid));
            const profile = {
                teacherName: teacherDoc?.teacherName || getProfile()?.teacherName || '',
                subjectName: teacherDoc?.subject || getProfile()?.subjectName || '',
                schoolName: teacherDoc?.schoolName || getProfile()?.schoolName || '',
                classroom: teacherDoc?.classroom || getProfile()?.classroom || '',
                email: email,
                uid: firebaseResult.uid
            };
            saveProfile(profile);
            
            // Record successful login
            recordSuccessfulLogin();
            
            // MANDATORY: Start automatic cloud sync
            console.log('🔄 Starting MANDATORY cloud sync on login...');
            await startAutoSync();
            
            // Show main content
            const mainContent = document.querySelector('.main-content');
            mainContent.classList.add('visible');
            updateHeaderWithTeacherInfo();
            loginModal.style.display = 'none';
            authLanding.style.display = 'none';
            document.body.classList.remove('blur-active');
            
            await renderAllColumns();
            alert('✅ Welcome back! Cloud sync enabled - your data is synchronized.');
            applyRoleUIState();
            if (role === 'admin') {
                adminDashboardBtn?.style.setProperty('display', 'inline-block');
            }
            loginForm.reset();
            return;
        }
    } catch (error) {
        console.log('Cloud login failed, trying local login...');
    }
    
    // Fallback to local login (for backward compatibility)
    const profile = getProfile();
    if (!profile) {
        recordFailedLogin();
        alert('❌ No local profile found. Please create a profile first or login with cloud email.');
        showAuthLanding();
        return;
    }
    
    // Verify credentials match stored profile (case-sensitive for password)
    if ((profile.email || profile.teacherName) === email && profile.password === password) {
        // Valid local login
        createSecureSession(email, profile.uid || 'local', 'user');
        recordSuccessfulLogin();
        
        const mainContent = document.querySelector('.main-content');
        mainContent.classList.add('visible');
        updateHeaderWithTeacherInfo();
        loginModal.style.display = 'none';
        authLanding.style.display = 'none';
        document.body.classList.remove('blur-active');
        alert('✅ Welcome back!');
        applyRoleUIState();
        loginForm.reset();
    } else {
        recordFailedLogin();
        alert('❌ Invalid Email or Password. Please try again.');
        loginPasswordInput.value = '';
    }
});

backLoginBtn.addEventListener('click', showAuthLanding);
backFromLoginBtn.addEventListener('click', showAuthLanding);

// ========================
// PASSWORD RESET
// ========================

function openForgotPasswordModal() {
    loginModal.style.display = 'none';
    forgotPasswordModal.classList.add('blur-bg');
    document.body.classList.add('blur-active');
    forgotPasswordModal.style.display = 'flex';
    resetTeacherName.focus();
}

function closeForgotPasswordModal() {
    forgotPasswordModal.style.display = 'none';
    resetVerificationStep.style.display = 'block';
    resetPasswordStep.style.display = 'none';
    resetTeacherName.value = '';
    resetVerificationMethod.value = '';
    resetVerificationValue.value = '';
    resetNewPassword.value = '';
    resetConfirmPassword.value = '';
    // Return to login modal and keep blur active
    try { showLoginModal(); } catch (_) {}
}

// Forgot Password button
if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', openForgotPasswordModal);
} else {
    console.warn('⚠️ forgotPasswordBtn not found - forgot password disabled');
}

// Close forgot password modal
if (closeForgotPasswordBtn) {
    closeForgotPasswordBtn.addEventListener('click', closeForgotPasswordModal);
}
if (resetBackBtn) {
    resetBackBtn.addEventListener('click', closeForgotPasswordModal);
}

// Verification step
if (resetVerifyBtn) {
    resetVerifyBtn.addEventListener('click', () => {
        const teacherName = resetTeacherName.value.trim();
        const method = resetVerificationMethod.value;
        const value = resetVerificationValue.value.trim();
        
        if (!teacherName || !method || !value) {
            alert('❌ All fields are required!');
            return;
        }
        
        // Verify identity
        const verification = verifyIdentity(teacherName, method, value);
        if (!verification.success) {
            alert('❌ ' + verification.error);
            return;
        }
        
        // Move to password reset step
        resetVerificationStep.style.display = 'none';
        resetPasswordStep.style.display = 'block';
        resetNewPassword.focus();
    });
}

// Back to verification
if (resetBackToVerifyBtn) {
    resetBackToVerifyBtn.addEventListener('click', () => {
        resetVerificationStep.style.display = 'block';
        resetPasswordStep.style.display = 'none';
        resetNewPassword.value = '';
        resetConfirmPassword.value = '';
    });
}

// Submit password reset
if (resetSubmitBtn) {
    resetSubmitBtn.addEventListener('click', () => {
        const newPassword = resetNewPassword.value;
        const confirmPassword = resetConfirmPassword.value;
        
        // Reset password
        const result = resetPassword(newPassword, confirmPassword);
        if (!result.success) {
            alert('❌ ' + result.error);
            return;
        }
        
        // Success
        alert('✅ Password reset successfully! Please login with your new password.');
        closeForgotPasswordModal();
        loginModal.style.display = 'flex';
        loginTeacherNameInput.focus();
    });
}

// Create Profile Form
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const teacherName = teacherNameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Validate username
    const usernameValidation = validateUsername(teacherName);
    if (!usernameValidation.valid) {
        alert('❌ ' + usernameValidation.error);
        return;
    }
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        alert('❌ ' + passwordValidation.error);
        return;
    }
    
    if (password !== confirmPassword) {
        alert('❌ Passwords do not match!');
        return;
    }
    
    // Store the profile data temporarily before subject selection
    window.tempProfileData = {
        teacherName: usernameValidation.value,
        subjectName: '', // Will be filled after subject selection
        password: password,
        schoolName: sanitizeInput(schoolNameInput.value),
        email: sanitizeInput(emailInput.value),
        phone: sanitizeInput(phoneInput.value),
        classroom: sanitizeInput(classroomInput.value)
    };
    
    console.log('✓ Personal details saved temporarily. Select subject to complete registration.');
    
    // Open subject selection modal
    openSubjectSelectionModal();
});

// Subject Selection Submit
submitSubjectBtn.addEventListener('click', async () => {
    if (!selectedSubject) {
        alert('Please select a subject!');
        return;
    }
    
    // Complete the profile data with selected subject
    const profileData = {
        ...window.tempProfileData,
        subjectName: selectedSubject,
        activeSubjectName: selectedSubject,
        subjects: [{ id: selectedSubject.toLowerCase().replace(/\s+/g, '-'), name: selectedSubject }]
    };
    
    try {
        // IMPORTANT: Email is REQUIRED for Firebase authentication
        const email = profileData.email ? profileData.email.trim() : null;
        
        if (!email) {
            alert('❌ Email address is REQUIRED to create an account.\n\nPlease go back and enter your email address.');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('❌ Invalid email format. Please enter a valid email address (e.g., your.name@school.com)');
            return;
        }
        
        // Register user in Firebase
        const firebaseResult = await signUpTeacher(email, profileData.password, profileData);
        
        if (!firebaseResult.success) {
            console.error('❌ Firebase signup failed:', firebaseResult.error);
            alert('❌ Cloud registration failed: ' + firebaseResult.error + '\n\nPlease check:\n1. Email is valid and not already registered\n2. Password meets requirements\n3. You have internet connection');
            // Keep the form open so user can retry
            return;
        }
        
        // Firebase signup succeeded - user account created
        console.log('✓ User registered in Firebase:', firebaseResult.uid);
        
        // Clear old data before saving new profile
        await clearAllLessons();
        
        // Save the complete profile locally
        saveProfile(profileData);
        
        // Seed new topics for this user based on selected subject
        showGlobalLoader('Finalizing setup...', 'Seeding topics and starting sync');
        const { addedCount, subject } = await seedInitialLessons(profileData.subjectName);
        if (addedCount === 0) {
            alert(`No default topics available for ${subject || 'this subject'}.
\nYou can add topics manually or import from CSV via Load Topics.`);
            if (typeof openLoadTopicsModal === 'function') openLoadTopicsModal();
        }
        
        // Push all topics to Firebase cloud
        await pushLocalDataToCloud();
        
        // MANDATORY: Start automatic cloud sync
        console.log('🔄 Starting MANDATORY cloud sync on signup...');
        await startAutoSync();
        
        // Create secure session for the new user
        createSecureSession(profileData.teacherName, firebaseResult.uid, 'user');
        applyRoleUIState?.();
        
        // Update header with teacher info
        if (typeof updateHeaderWithTeacherInfo === 'function') {
            updateHeaderWithTeacherInfo();
        }

        // Show main content
        const mainContent = document.querySelector('.main-content');
        mainContent.classList.add('visible');
        closeSubjectSelectionModal();
        // Remove blur as we enter the main app
        document.body.classList.remove('blur-active');
        
        // Render the new empty/fresh columns
        await renderAllColumns();
        
        alert('✅ Profile created! Cloud sync enabled - your data is automatically backed up.');
        hideGlobalLoader();
        
        // Clear temp data
        window.tempProfileData = null;
    } catch (error) {
        console.error('Profile creation error:', error);
        alert('❌ Error creating profile: ' + error.message + '\n\nYour registration data is saved locally. Please try again.');
        hideGlobalLoader();
    }
});

backCreateBtn.addEventListener('click', showAuthLanding);
backFromCreateBtn.addEventListener('click', showAuthLanding);

// Load Default Topics from Settings
loadDefaultTopicsBtn.addEventListener('click', async () => {
    closeSettingsModal();
    
    // Create subject/level selection modal
    const selectDialog = document.createElement('div');
    selectDialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const dialogContent = document.createElement('div');
    dialogContent.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 20px;
        max-width: 500px;
        max-height: 70vh;
        overflow-y: auto;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    `;
    
    let selectedSubject = null;
    let selectedLevel = null;
    
    const subjects = [
        'Basic Computer Knowledge',
        'ICT/Information Technology',
        'Domestic Electric',
        'Mechanic',
        'Driving',
        'Mathematics Basic',
        'English',
        'Technical Drawing'
    ];
    
    const levels = ['Level One', 'Level Two', 'Level Three', 'Level Four'];
    
    let dialogHTML = `<h2 style="margin-top: 0;">Load Topics by Subject & Level</h2>
    <p style="color: #666; margin-bottom: 15px;">Step 1: Select a Subject</p>
    <div id="subjectContainer" style="margin-bottom: 20px;">`;
    
    subjects.forEach(subject => {
        dialogHTML += `
            <button class="subject-select-btn" data-subject="${subject}" style="
                width: 100%;
                padding: 10px;
                margin-bottom: 8px;
                border: 2px solid #ddd;
                background: #f9f9f9;
                border-radius: 4px;
                cursor: pointer;
                text-align: left;
                transition: 0.2s;
            ">
            📖 ${subject}
            </button>
        `;
    });
    
    dialogHTML += `</div>
    <p id="levelLabel" style="color: #666; margin-bottom: 15px; display: none;">Step 2: Select a Level</p>
    <div id="levelContainer" style="margin-bottom: 20px; display: none;">`;
    
    levels.forEach(level => {
        dialogHTML += `
            <button class="level-select-btn" data-level="${level}" style="
                width: 100%;
                padding: 10px;
                margin-bottom: 8px;
                border: 2px solid #ddd;
                background: #f9f9f9;
                border-radius: 4px;
                cursor: pointer;
                transition: 0.2s;
            ">
            📚 ${level}
            </button>
        `;
    });
    
    dialogHTML += `</div>
    <button id="cancelSelectBtn" style="
        width: 100%;
        padding: 10px;
        border: 1px solid #bbb;
        background: #f0f0f0;
        border-radius: 4px;
        cursor: pointer;
    ">Cancel</button>`;
    
    dialogContent.innerHTML = dialogHTML;
    selectDialog.appendChild(dialogContent);
    document.body.appendChild(selectDialog);
    
    // Subject selection
    document.querySelectorAll('.subject-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedSubject = btn.dataset.subject;
            
            // Highlight selected subject
            document.querySelectorAll('.subject-select-btn').forEach(b => {
                b.style.borderColor = '#ddd';
                b.style.background = '#f9f9f9';
            });
            btn.style.borderColor = '#3498db';
            btn.style.background = '#e3f2fd';
            
            // Show level selection
            document.getElementById('levelLabel').style.display = 'block';
            document.getElementById('levelContainer').style.display = 'block';
        });
    });
    
    // Level selection
    document.querySelectorAll('.level-select-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            selectedLevel = btn.dataset.level;
            
            // Get sample topics to show (using the initial lessons list)
            const sampleTopics = [
                'History and Evolution of Computers',
                'Types of Computers',
                'Basic Computer Operations',
                'Computer Hardware Components',
                'Operating Systems Overview',
                'MS Windows Basics',
                'File Management',
                'Introduction to Internet'
            ];
            
            // Create preview modal
            document.body.removeChild(selectDialog);
            
            const previewDialog = document.createElement('div');
            previewDialog.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
            
            const previewContent = document.createElement('div');
            previewContent.style.cssText = `
                background: white;
                border-radius: 8px;
                padding: 20px;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            `;
            
            let topicsList = [...sampleTopics];
            
            let previewHTML = `<h2 style="margin-top: 0;">Review Topics for ${selectedSubject}</h2>
            <p style="color: #666; margin-bottom: 15px;">Level: ${selectedLevel}</p>
            
            <div id="topicsListContainer" style="margin-bottom: 20px; max-height: 400px; overflow-y: auto; border: 1px solid #ddd; border-radius: 4px; padding: 10px;">`;
            
            topicsList.forEach((topic, i) => {
                previewHTML += `
                    <div class="topic-item" data-index="${i}" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        background: #f9f9f9;
                        margin-bottom: 8px;
                        border-radius: 4px;
                    ">
                        <span style="flex: 1;">${i+1}. ${topic}</span>
                        <button class="remove-topic-btn" data-index="${i}" style="
                            padding: 4px 8px;
                            background: #ff6b6b;
                            color: white;
                            border: none;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                        ">Remove</button>
                    </div>
                `;
            });
            
            previewHTML += `</div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="margin-bottom: 10px;">Add Custom Topic</h3>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="newTopicInput" placeholder="Enter topic name..." style="
                        flex: 1;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                    ">
                    <button id="addTopicBtn" style="
                        padding: 10px 15px;
                        background: #27ae60;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    ">+ Add</button>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button id="loadTopicsPreviewBtn" style="
                    flex: 1;
                    padding: 12px;
                    background: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                ">✅ Load All Topics</button>
                <button id="cancelPreviewBtn" style="
                    flex: 1;
                    padding: 12px;
                    background: #f0f0f0;
                    border: 1px solid #bbb;
                    border-radius: 4px;
                    cursor: pointer;
                ">Cancel</button>
            </div>`;
            
            previewContent.innerHTML = previewHTML;
            previewDialog.appendChild(previewContent);
            document.body.appendChild(previewDialog);
            
            // Remove topic handler
            document.querySelectorAll('.remove-topic-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.index);
                    topicsList.splice(index, 1);
                    
                    // Refresh the preview
                    const item = btn.closest('.topic-item');
                    item.style.opacity = '0.5';
                    item.style.textDecoration = 'line-through';
                    btn.disabled = true;
                    btn.textContent = 'Removed';
                });
            });
            
            // Add topic handler
            document.getElementById('addTopicBtn').addEventListener('click', () => {
                const input = document.getElementById('newTopicInput');
                const newTopic = input.value.trim();
                
                if (newTopic) {
                    topicsList.push(newTopic);
                    
                    // Add to display
                    const container = document.getElementById('topicsListContainer');
                    const newItem = document.createElement('div');
                    newItem.className = 'topic-item';
                    newItem.style.cssText = `
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        background: #e8f5e9;
                        margin-bottom: 8px;
                        border-radius: 4px;
                    `;
                    newItem.innerHTML = `
                        <span>${topicsList.length}. ${newTopic}</span>
                        <button class="remove-topic-btn" style="
                            padding: 4px 8px;
                            background: #ff6b6b;
                            color: white;
                            border: none;
                            border-radius: 3px;
                            cursor: pointer;
                            font-size: 12px;
                        ">Remove</button>
                    `;
                    container.appendChild(newItem);
                    input.value = '';
                    input.focus();
                }
            });
            
            // Load topics handler
            document.getElementById('loadTopicsPreviewBtn').addEventListener('click', async () => {
                if (topicsList.length === 0) {
                    alert('Please add at least one topic!');
                    return;
                }
                
                // Load the topics
                await seedInitialLessons();
                await renderAllColumns();
                document.body.removeChild(previewDialog);
                alert(`✅ ${topicsList.length} topics loaded for ${selectedSubject} - ${selectedLevel}!`);
            });
            
            // Cancel handler
            document.getElementById('cancelPreviewBtn').addEventListener('click', () => {
                document.body.removeChild(previewDialog);
            });
            
            // Close when clicking outside
            previewDialog.addEventListener('click', (e) => {
                if (e.target === previewDialog) {
                    document.body.removeChild(previewDialog);
                }
            });
        });
    });
    
    // Cancel button
    document.getElementById('cancelSelectBtn').addEventListener('click', () => {
        document.body.removeChild(selectDialog);
    });
    
    // Close when clicking outside
    selectDialog.addEventListener('click', (e) => {
        if (e.target === selectDialog) {
            document.body.removeChild(selectDialog);
        }
    });
});

// Change Password button
changePasswordBtn.addEventListener('click', () => {
    closeSettingsModal();
    changePasswordModal.style.display = 'flex';
    currentPasswordInput.focus();
});

closeChangePasswordModalBtn.addEventListener('click', () => {
    changePasswordModal.style.display = 'none';
});

cancelChangePasswordBtn.addEventListener('click', () => {
    changePasswordModal.style.display = 'none';
});

changePasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const profile = getProfile();
    const currentPass = currentPasswordInput.value.trim();
    const newPass = newPasswordInput.value;
    const confirmPass = confirmNewPasswordInput.value;
    
    if (!currentPass || !newPass || !confirmPass) {
        alert('❌ All fields are required!');
        return;
    }
    
    // Verify current password
    if (currentPass !== profile.password) {
        alert('❌ Current password is incorrect!');
        return;
    }
    
    // Validate new password strength
    const passwordValidation = validatePassword(newPass);
    if (!passwordValidation.valid) {
        alert('❌ ' + passwordValidation.error);
        return;
    }
    
    if (newPass !== confirmPass) {
        alert('❌ New passwords do not match!');
        return;
    }
    
    // Check if new password is same as old
    if (newPass === currentPass) {
        alert('❌ New password must be different from current password!');
        return;
    }
    
    // Update password in profile
    profile.password = newPass;
    saveProfile(profile);
    changePasswordForm.reset();
    changePasswordModal.style.display = 'none';
    alert('✅ Password changed successfully!');
});

// Logout button
logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout? You will need to login again.')) {
        // Clear secure session
        clearSession();
        
        // Hide content
        const mainContent = document.querySelector('.main-content');
        mainContent.classList.remove('visible');
        closeSettingsModal();
        loginForm.reset();
        showAuthLanding();
        alert('✅ Logged out successfully!');
    }
});

// Force Reset button
forceResetBtn.addEventListener('click', () => {
    if (confirm('Are you sure? This will delete all data and redirect to reset page.')) {
        window.location.href = 'force-reset.html';
    }
});

// Delete modal
closeDeleteModalBtn.addEventListener('click', closeDeleteModal);
cancelDeleteBtn.addEventListener('click', closeDeleteModal);
confirmDeleteBtn.addEventListener('click', async () => {
    if (currentDeletingLessonId) {
        try {
            showSyncIndicator('🗑️ Deleting topic...');
            await deleteLessonFromDB(currentDeletingLessonId);
            await renderAllColumns();
            showSyncIndicator('✅ Topic deleted');
        } catch (err) {
            console.error('Error deleting topic:', err);
            showSyncIndicator('❌ Delete failed');
        }
        closeDeleteModal();
    }
});

// Add card buttons
document.querySelectorAll('.btn-add-card').forEach(btn => {
    btn.addEventListener('click', () => {
        const status = btn.dataset.status;
        const form = lessonForm;
        
        // Reset and set status
        form.reset();
        statusSelect.value = status;
        periodsPlannedInput.value = '2';
        periodsUsedInput.value = '0';
        modalTitle.textContent = 'Add New Topic';
        currentEditingLessonId = null;
        
        lessonModal.style.display = 'flex';
        topicInput.focus();
    });
});

// Export button
exportBtn.addEventListener('click', openExportModal);

// Load Topics button
loadTopicsBtn?.addEventListener('click', openLoadTopicsModal);

// View Topics button
viewTopicsBtn.addEventListener('click', openViewTopicsModal);
closeViewTopicsModalBtn.addEventListener('click', closeViewTopicsModal);
closeViewTopicsBtn.addEventListener('click', closeViewTopicsModal);

// Subject Selection close button
closeSubjectSelectionBtn.addEventListener('click', () => {
    subjectSelectionModal.style.display = 'none';
    selectedSubject = null;
});
// Toggle password visibility in login modal
const toggleLoginPasswordBtn = document.getElementById('toggleLoginPassword');
toggleLoginPasswordBtn?.addEventListener('click', () => {
    const isHidden = loginPasswordInput.type === 'password';
    loginPasswordInput.type = isHidden ? 'text' : 'password';
    toggleLoginPasswordBtn.textContent = isHidden ? '🙈' : '👁️';
});

// Topics search
topicsSearchInput.addEventListener('input', (e) => {
    renderTopicsList(e.target.value);
});

