/**
 * ui.js - UI Rendering and Interaction
 * Handles DOM updates and user interactions
 */

// Modal management
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

// Global state for editing
let currentEditingLessonId = null;
let currentDeletingLessonId = null;

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
        
        if (searchTerm) {
            filteredLessons = lessons.filter(lesson => 
                lesson.topic.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (filteredLessons.length === 0) {
            topicsListContainer.innerHTML = '<p style="text-align: center; padding: var(--spacing-lg); color: var(--text-secondary);">No topics found</p>';
            return;
        }
        
        let html = '<div style="display: grid; grid-template-columns: 1fr; gap: var(--spacing-sm);">';
        
        filteredLessons.forEach((lesson, index) => {
            html += `
                <div style="padding: var(--spacing-md); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: var(--spacing-md);">
                    <span style="color: var(--text-secondary); min-width: 30px;">${index + 1}.</span>
                    <span style="color: var(--text-primary);">${lesson.topic}</span>
                </div>
            `;
        });
        
        html += '</div>';
        topicsListContainer.innerHTML = html;
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
}

function closeSettingsModal() {
    settingsModal.style.display = 'none';
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
}

function showLoginModal() {
    authLanding.style.display = 'none';
    loginModal.style.display = 'flex';
    loginTeacherNameInput.focus();
}

function showCreateProfileModal() {
    authLanding.style.display = 'none';
    createProfileModal.style.display = 'flex';
    teacherNameInput.focus();
}

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

function updateHeaderWithTeacherInfo() {
    const profile = getProfile();
    if (profile && profile.teacherName && profile.subjectName) {
        teacherInfo.textContent = `👤 ${profile.teacherName} • 📖 ${profile.subjectName}`;
        teacherInfo.style.display = 'block';
    } else {
        teacherInfo.style.display = 'none';
    }
}

function populateProfileForm() {
    const profile = getProfile();
    if (profile) {
        teacherNameInput.value = profile.teacherName || '';
        subjectNameInput.value = profile.subjectName || '';
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
    
    const statuses = ['not-started', 'in-progress', 'completed'];
    
    for (const status of statuses) {
        const columnElement = document.getElementById(`column-${status}`);
        const columnHeader = document.querySelector(`[data-status="${status}"] .column-header`);
        const countBadge = columnHeader.querySelector('.column-count');
        
        const lessonsInStatus = allLessons.filter(l => l.status === status);
        
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
                    await saveLessonToDB(lesson);
                    await renderAllColumns();
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
        const lines = csvText.trim().split('\n');
        const header = lines[0].split(',').map(h => h.trim());
        
        let importedCount = 0;
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
            
            await saveLessonToDB(lesson);
            importedCount++;
        }
        
        alert(`Successfully imported ${importedCount} topics!`);
        await renderAllColumns();
    } catch (error) {
        console.error('Error importing CSV:', error);
        alert('Error importing file. Check console for details.');
    }
}

async function exportToCSV() {
    const lessons = await getAllLessons();
    
    // Sort by week
    lessons.sort((a, b) => (a.week || 0) - (b.week || 0));
    
    let csv = 'Topic,Week,Status,Periods Planned,Periods Used,% Complete,Last Taught,Next Start,Remarks\n';
    
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
    
    downloadFile(csv, 'teaching-progress.csv', 'text/csv');
    closeExportModalWindow();
}

async function exportToPDF() {
    const lessons = await getAllLessons();
    
    // Sort by week
    lessons.sort((a, b) => (a.week || 0) - (b.week || 0));
    
    const today = new Date().toLocaleDateString();
    const totalTopics = lessons.length;
    const completed = lessons.filter(l => l.status === 'completed').length;
    const inProgress = lessons.filter(l => l.status === 'in-progress').length;
    const notStarted = lessons.filter(l => l.status === 'not-started').length;
    
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
    <p><strong>School:</strong> Vocational Training School, Tanzania | <strong>Course:</strong> BCK Level One</p>
    <p><strong>Generated:</strong> ${today}</p>
    
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
        <p>This report was generated from the Teaching Progress Tracker PWA.</p>
        <p>For offline access and tracking, download the app or add to home screen on mobile.</p>
    </div>
</body>
</html>
    `;
    
    downloadFile(html, 'teaching-progress-summary.html', 'text/html');
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
        await seedInitialLessons();
        await renderAllColumns();
        alert('Standard curriculum loaded!');
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

// Settings modal
closeSettingsModalBtn.addEventListener('click', closeSettingsModal);
closeSettingsBtn.addEventListener('click', closeSettingsModal);

// Load Topics modal
loadTopicsBtn.addEventListener('click', openLoadTopicsModal);
closeLoadTopicsModalBtn.addEventListener('click', closeLoadTopicsModalFunc);
closeLoadTopicsBtn.addEventListener('click', closeLoadTopicsModalFunc);

loadDefaultTopicsFormBtn.addEventListener('click', async () => {
    closeLoadTopicsModalFunc();
    if (confirm('Load standard curriculum? This will add topics to your current list.')) {
        await seedInitialLessons();
        await renderAllColumns();
        alert('Standard curriculum loaded!');
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

// Auth Landing
loginBtn.addEventListener('click', showLoginModal);
createProfileBtn.addEventListener('click', showCreateProfileModal);

// Login Form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = loginTeacherNameInput.value.trim();
    const password = loginPasswordInput.value.trim();
    
    if (!name || !password) {
        alert('Please enter both Teacher Name and Password!');
        return;
    }
    
    const profile = getProfile();
    if (!profile) {
        alert('No profiles found. Please create a profile first.');
        showAuthLanding();
        return;
    }
    
    if (profile.teacherName === name && profile.password === password) {
        // Valid login
        const mainContent = document.querySelector('.main-content');
        mainContent.classList.add('visible');
        updateHeaderWithTeacherInfo();
        loginModal.style.display = 'none';
        authLanding.style.display = 'none';
        alert('Welcome back, ' + name + '!');
    } else {
        alert('Invalid Teacher Name or Password. Please try again.');
    }
});

backLoginBtn.addEventListener('click', showAuthLanding);
backFromLoginBtn.addEventListener('click', showAuthLanding);

// Create Profile Form
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!teacherNameInput.value.trim() || !subjectNameInput.value.trim()) {
        alert('Teacher Name and Subject Name are required!');
        return;
    }
    if (!passwordInput.value.trim()) {
        alert('Password is required!');
        return;
    }
    if (passwordInput.value.length < 4) {
        alert('Password must be at least 4 characters long!');
        return;
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
        alert('Passwords do not match!');
        return;
    }
    const profileData = {
        teacherName: teacherNameInput.value,
        subjectName: subjectNameInput.value,
        password: passwordInput.value,
        schoolName: schoolNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        classroom: classroomInput.value
    };
    saveProfile(profileData);
    
    // Show main content
    const mainContent = document.querySelector('.main-content');
    mainContent.classList.add('visible');
    createProfileModal.style.display = 'none';
    alert('Profile created successfully! Welcome to the app!');
});

backCreateBtn.addEventListener('click', showAuthLanding);
backFromCreateBtn.addEventListener('click', showAuthLanding);

// Load Default Topics from Settings
loadDefaultTopicsBtn.addEventListener('click', async () => {
    closeSettingsModal();
    if (confirm('Load standard curriculum? This will add topics to your current list.')) {
        await seedInitialLessons();
        await renderAllColumns();
        alert('Standard curriculum loaded!');
    }
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
    const newPass = newPasswordInput.value.trim();
    const confirmPass = confirmNewPasswordInput.value.trim();
    
    if (!currentPass || !newPass || !confirmPass) {
        alert('All fields are required!');
        return;
    }
    
    if (currentPass !== profile.password) {
        alert('Current password is incorrect!');
        return;
    }
    
    if (newPass.length < 4) {
        alert('New password must be at least 4 characters!');
        return;
    }
    
    if (newPass !== confirmPass) {
        alert('Passwords do not match!');
        return;
    }
    
    // Update password in profile
    profile.password = newPass;
    saveProfile(profile);
    changePasswordForm.reset();
    changePasswordModal.style.display = 'none';
    alert('Password changed successfully!');
});

// Logout button
logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout? You will need to login again.')) {
        // Don't delete profile - just hide content so user can login again
        const mainContent = document.querySelector('.main-content');
        mainContent.classList.remove('visible');
        closeSettingsModal();
        loginForm.reset();
        showAuthLanding();
        alert('Logged out successfully!');
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
        await deleteLessonFromDB(currentDeletingLessonId);
        await renderAllColumns();
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
loadTopicsBtn.addEventListener('click', openLoadTopicsModal);

// View Topics button
viewTopicsBtn.addEventListener('click', openViewTopicsModal);
closeViewTopicsModalBtn.addEventListener('click', closeViewTopicsModal);
closeViewTopicsBtn.addEventListener('click', closeViewTopicsModal);

// Topics search
topicsSearchInput.addEventListener('input', (e) => {
    renderTopicsList(e.target.value);
});

