/**
 * db.js - IndexedDB Database Management
 * Handles all database operations for lesson storage
 */

const DB_NAME = 'TeachingProgressDB';
const DB_VERSION = 1;
const STORE_NAME = 'lessons';

let db = null;

// Initialize the database
async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // Handle database upgrade
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            
            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                store.createIndex('status', 'status', { unique: false });
                store.createIndex('week', 'week', { unique: false });
            }
        };

        request.onsuccess = () => {
            db = request.result;
            console.log('Database initialized successfully');
            resolve(db);
        };

        request.onerror = () => {
            console.error('Database initialization failed:', request.error);
            reject(request.error);
        };
    });
}

// Ensure DB is ready before operations
async function ensureDBReady() {
    if (!db) {
        try {
            await initDB();
        } catch (e) {
            console.warn('⚠️ ensureDBReady: initDB failed:', e);
        }
    }
    return !!db;
}

// Add or update a lesson (with MANDATORY automatic cloud sync)
async function saveLessonToDB(lesson) {
    return new Promise(async (resolve, reject) => {
        const ready = await ensureDBReady();
        if (!ready) {
            console.warn('⚠️ DB not ready; skipping local save, will attempt cloud sync only');
            try {
                const syncResult = await saveLessonToCloud(lesson);
                if (syncResult.success || syncResult.queued) {
                    resolve(null);
                    return;
                }
            } catch (err) {
                return reject(err);
            }
        }
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        const request = lesson.id ? store.put(lesson) : store.add(lesson);

        request.onsuccess = async () => {
            console.log('✓ Lesson saved locally:', request.result);
            
            // MANDATORY: Automatically sync to Firebase cloud
            try {
                const syncResult = await saveLessonToCloud(lesson);
                if (syncResult.success) {
                    console.log('✓ Lesson automatically synced to cloud');
                } else if (syncResult.queued) {
                    console.log('⏳ Lesson queued for cloud sync');
                }
            } catch (error) {
                console.warn('⚠️ Cloud sync failed, will retry:', error.message);
            }
            
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('❌ Error saving lesson:', request.error);
            reject(request.error);
        };
    });
}

// Get all lessons
async function getAllLessons() {
    return new Promise((resolve, reject) => {
        if (!db) {
            console.warn('⚠️ Database not initialized yet');
            resolve([]);
            return;
        }
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('Error fetching lessons:', request.error);
            reject(request.error);
        };
    });
}

// Get lesson by ID
async function getLessonByID(id) {
    return new Promise(async (resolve, reject) => {
        const ready = await ensureDBReady();
        if (!ready) {
            console.warn('⚠️ DB not initialized; getLessonByID returning null');
            resolve(null);
            return;
        }
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('Error fetching lesson:', request.error);
            reject(request.error);
        };
    });
}

// Get lessons by status
async function getLessonsByStatus(status) {
    return new Promise(async (resolve, reject) => {
        const ready = await ensureDBReady();
        if (!ready) {
            console.warn('⚠️ DB not initialized; getLessonsByStatus returning []');
            resolve([]);
            return;
        }
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('status');
        const request = index.getAll(status);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('Error fetching lessons by status:', request.error);
            reject(request.error);
        };
    });
}

// Delete lesson by ID
// Delete a lesson (with MANDATORY automatic cloud sync)
async function deleteLessonFromDB(id) {
    return new Promise(async (resolve, reject) => {
        const ready = await ensureDBReady();
        if (!ready) {
            console.warn('⚠️ DB not initialized; deleteLessonFromDB skipping local delete');
            // Still attempt cloud deletion
            try {
                const syncResult = await deleteLessonFromCloud(id);
                if (syncResult.success || syncResult.queued) {
                    resolve(true);
                    return;
                }
            } catch (e) {
                return reject(e);
            }
        }
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = async () => {
            console.log('✓ Lesson deleted locally:', id);
            
            // MANDATORY: Automatically sync deletion to Firebase cloud
            try {
                const syncResult = await deleteLessonFromCloud(id);
                if (syncResult.success) {
                    console.log('✓ Lesson deletion automatically synced to cloud');
                } else if (syncResult.queued) {
                    console.log('⏳ Lesson deletion queued for cloud sync');
                }
            } catch (error) {
                console.warn('⚠️ Cloud sync failed, will retry:', error.message);
            }
            
            resolve(true);
        };

        request.onerror = () => {
            console.error('❌ Error deleting lesson:', request.error);
            reject(request.error);
        };
    });
}

// Clear all lessons (for reset)
async function clearAllLessons() {
    return new Promise(async (resolve, reject) => {
        try {
            // Ensure the database is initialized before attempting to clear
            if (!db) {
                try {
                    await initDB();
                } catch (initError) {
                    console.warn('⚠️ initDB failed before clearAllLessons:', initError);
                }
            }

            if (!db) {
                console.warn('⚠️ Database not initialized; skipping clearAllLessons');
                resolve(false);
                return;
            }

            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.clear();

            request.onsuccess = () => {
                console.log('All lessons cleared');
                resolve(true);
            };

            request.onerror = () => {
                console.error('Error clearing lessons:', request.error);
                reject(request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}

// Check if database is empty (for initial seed)
async function isDatabaseEmpty() {
    return new Promise(async (resolve, reject) => {
        const ready = await ensureDBReady();
        if (!ready) {
            console.warn('⚠️ DB not initialized; treating as empty');
            resolve(true);
            return;
        }
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.count();

        request.onsuccess = () => {
            resolve(request.result === 0);
        };

        request.onerror = () => {
            console.error('Error checking database:', request.error);
            reject(request.error);
        };
    });
}

// Subject-aware default lessons providers
function getBCKInitialLessons() {
    return [
        // PHASE 1: COMPUTER FOUNDATIONS (Weeks 1-8, 9 topics)
        {
            topic: 'History and Evolution of Computers',
            week: 1,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 1: Computer Foundations'
        },
        {
            topic: 'Types of Computers (Desktop, Laptop, Tablet, Server)',
            week: 2,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 1: Computer Foundations'
        },
        {
            topic: 'Uses of Computers in Daily Life & Work',
            week: 3,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 1: Computer Foundations'
        },
        {
            topic: 'Internal Hardware (CPU, RAM, Motherboard)',
            week: 4,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 1: Computer Foundations'
        },
        {
            topic: 'Input Devices (Keyboard, Mouse, Scanner)',
            week: 5,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 1: Computer Foundations'
        },
        {
            topic: 'Output Devices (Monitor, Printer, Speaker)',
            week: 6,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 1: Computer Foundations'
        },
        {
            topic: 'Storage Devices (HDD, SSD, Flash Disk, Memory Card)',
            week: 7,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 1: Computer Foundations'
        },
        {
            topic: 'Computer System Overview',
            week: 8,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 1: Computer Foundations'
        },
        
        // PHASE 2: SOFTWARE & OPERATING SYSTEMS (Weeks 9-18, 12 topics)
        {
            topic: 'What is Software',
            week: 9,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        {
            topic: 'Types of Software (System vs Application)',
            week: 10,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        {
            topic: 'Introduction to Operating Systems',
            week: 11,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        {
            topic: 'Types of Operating Systems (Windows, Linux, Mobile OS)',
            week: 12,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        {
            topic: 'Booting Process & Desktop Environment',
            week: 13,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        {
            topic: 'Using Keyboard & Mouse (Practical)',
            week: 14,
            status: 'not-started',
            periodsPlanned: 6,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        {
            topic: 'Windows Desktop & Taskbar',
            week: 15,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        {
            topic: 'File and Folder Management',
            week: 16,
            status: 'not-started',
            periodsPlanned: 6,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        {
            topic: 'Installing & Uninstalling Software',
            week: 17,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        {
            topic: 'Basic System Settings & Control Panel',
            week: 18,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 2: Software & Operating Systems'
        },
        
        // PHASE 3: OFFICE APPLICATIONS (Weeks 19-26, 12 topics)
        {
            topic: 'Introduction to Word Processing',
            week: 19,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        {
            topic: 'Microsoft Word Interface',
            week: 20,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        {
            topic: 'Creating & Saving Documents',
            week: 21,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        {
            topic: 'Text Formatting (Fonts, Paragraphs)',
            week: 22,
            status: 'not-started',
            periodsPlanned: 6,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        {
            topic: 'Page Layout (Margins, Orientation)',
            week: 23,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        {
            topic: 'Tables, Images & Lists in Word',
            week: 24,
            status: 'not-started',
            periodsPlanned: 6,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        {
            topic: 'Practical Typing Skills',
            week: 25,
            status: 'not-started',
            periodsPlanned: 6,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        {
            topic: 'Creating Simple Documents (Letters, Reports)',
            week: 26,
            status: 'not-started',
            periodsPlanned: 6,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        {
            topic: 'Printing Documents',
            week: 27,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        {
            topic: 'Microsoft Word Review & Assessment',
            week: 28,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 3: Office Applications'
        },
        
        // PHASE 4: INTERNET & COMMUNICATION (Weeks 29-34, 8 topics)
        {
            topic: 'Introduction to Internet',
            week: 29,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 4: Internet & Communication'
        },
        {
            topic: 'Internet Services (WWW, Email, FTP)',
            week: 30,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 4: Internet & Communication'
        },
        {
            topic: 'Web Browsers (Chrome, Firefox)',
            week: 31,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 4: Internet & Communication'
        },
        {
            topic: 'Searching Information Online',
            week: 32,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 4: Internet & Communication'
        },
        {
            topic: 'Email Creation & Use',
            week: 33,
            status: 'not-started',
            periodsPlanned: 6,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 4: Internet & Communication'
        },
        {
            topic: 'Online Safety & Digital Etiquette',
            week: 34,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 4: Internet & Communication'
        },
        {
            topic: 'Social Media Basics (Educational Use)',
            week: 35,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 4: Internet & Communication'
        },
        {
            topic: 'Online Forms & Applications',
            week: 36,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 4: Internet & Communication'
        },
        
        // PHASE 5: COMPUTER SAFETY & MAINTENANCE (Weeks 37-42, 8 topics)
        {
            topic: 'Computer Health & Safety',
            week: 37,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 5: Computer Safety & Maintenance'
        },
        {
            topic: 'Ergonomics (Correct Sitting & Usage)',
            week: 38,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 5: Computer Safety & Maintenance'
        },
        {
            topic: 'Computer Viruses & Malware',
            week: 39,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 5: Computer Safety & Maintenance'
        },
        {
            topic: 'Antivirus Software',
            week: 40,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 5: Computer Safety & Maintenance'
        },
        {
            topic: 'Data Backup & Recovery',
            week: 41,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 5: Computer Safety & Maintenance'
        },
        {
            topic: 'Basic Computer Maintenance',
            week: 42,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 5: Computer Safety & Maintenance'
        },
        {
            topic: 'Cleaning & Handling Equipment',
            week: 43,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 5: Computer Safety & Maintenance'
        },
        {
            topic: 'Power Problems & Protection (UPS)',
            week: 44,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 5: Computer Safety & Maintenance'
        },
        
        // PHASE 6: BASIC DIGITAL SKILLS & CAREER AWARENESS (Weeks 45-52, 8 topics)
        {
            topic: 'Introduction to ICT Careers',
            week: 45,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 6: Basic Digital Skills & Career Awareness'
        },
        {
            topic: 'Using Computers in Business',
            week: 46,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 6: Basic Digital Skills & Career Awareness'
        },
        {
            topic: 'Basic Digital Records',
            week: 47,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 6: Basic Digital Skills & Career Awareness'
        },
        {
            topic: 'Introduction to Spreadsheets (Concept Only)',
            week: 48,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 6: Basic Digital Skills & Career Awareness'
        },
        {
            topic: 'Simple Data Entry Skills',
            week: 49,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 6: Basic Digital Skills & Career Awareness'
        },
        {
            topic: 'ICT Ethics & Laws',
            week: 50,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 6: Basic Digital Skills & Career Awareness'
        },
        {
            topic: 'Revision (Theory)',
            week: 51,
            status: 'not-started',
            periodsPlanned: 6,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 6: Basic Digital Skills & Career Awareness'
        },
        {
            topic: 'Practical Assessment',
            week: 52,
            status: 'not-started',
            periodsPlanned: 6,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Phase 6: Basic Digital Skills & Career Awareness'
        },
        
        // ENRICHMENT TOPICS (Optional Advanced Topics)
        {
            topic: 'Introduction to Smartphones & Mobile Apps',
            week: null,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Enrichment: Smartphones & Apps'
        },
        {
            topic: 'Cloud Storage Basics (Google Drive)',
            week: null,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Enrichment: Cloud Storage'
        },
        {
            topic: 'Introduction to Coding (Concept Only)',
            week: null,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Enrichment: Coding Concepts'
        },
        {
            topic: 'Introduction to Computer Networking (Concepts)',
            week: null,
            status: 'not-started',
            periodsPlanned: 5,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Enrichment: Networking'
        },
        {
            topic: 'Introduction to PWAs (Concept Demonstration)',
            week: null,
            status: 'not-started',
            periodsPlanned: 4,
            periodsUsed: 0,
            lastTaught: '',
            nextStart: '',
            remarks: 'Enrichment: Progressive Web Apps'
        }
    ];
}

function normalizeSubjectKey(subjectName = '') {
    const s = String(subjectName).trim().toLowerCase();
    if (!s) return '';
    // Simple normalization/synonyms
    if (s.includes('basic computer') || s === 'bck') return 'bck';
    return s;
}

function getDefaultLessonsForSubject(subjectName = '') {
    const key = normalizeSubjectKey(subjectName);
    switch (key) {
        case 'bck':
        case 'basic computer knowledge':
            return getBCKInitialLessons();
        default:
            return [];
    }
}

// Seed initial lessons according to selected subject.
// Returns { addedCount, totalAfter, subject }
async function seedInitialLessons(subjectOverride) {
    // Determine subject from override or local profile
    let subjectName = subjectOverride;
    if (!subjectName) {
        try {
            const raw = localStorage.getItem('teacherProfile');
            if (raw) {
                const prof = JSON.parse(raw);
                subjectName = prof?.subjectName || prof?.subject || '';
            }
        } catch (_) { /* ignore */ }
    }

    const initialLessons = getDefaultLessonsForSubject(subjectName);

    // Get existing lessons to check for duplicates
    const existingLessons = await getAllLessons();
    const existingTopics = new Set(existingLessons.map(l => l.topic.trim().toLowerCase()));

    let addedCount = 0;
    const total = initialLessons.length;
    let processed = 0;
    for (const lesson of initialLessons) {
        // Check if topic already exists (case-insensitive, trimmed)
        if (!existingTopics.has(lesson.topic.trim().toLowerCase())) {
            await saveLessonToDB(lesson);
            addedCount++;
        } else {
            console.log(`Skipped duplicate topic: "${lesson.topic}"`);
        }
        processed++;
        try {
            if (typeof window !== 'undefined' && typeof window.updateGlobalLoader === 'function') {
                window.updateGlobalLoader('Loading default topics...', `Seeding ${processed}/${total}`);
            }
        } catch (_) { /* no-op */ }
    }

    if (addedCount > 0) {
        console.log(`Initial lessons seeded for subject "${subjectName || 'unknown'}" - ${addedCount} new topics added (${existingLessons.length + addedCount} total)`);
    } else {
        console.log(`No default topics available for subject "${subjectName || 'unknown'}". Leaving list empty for manual entry.`);
    }

    return { addedCount, totalAfter: existingLessons.length + addedCount, subject: subjectName || '' };
}

// Export all lessons as array
async function exportLessonsToArray() {
    return new Promise((resolve, reject) => {
        getAllLessons().then(lessons => {
            resolve(lessons);
        }).catch(reject);
    });
}

// RESET PROFILE - Clear all data (lessons, session, profile)
async function resetAllData() {
    try {
        console.log('🔄 Starting complete profile reset...');
        
        // Clear IndexedDB lessons
        await clearAllLessons();
        console.log('✓ Local lessons cleared');
        
        // Clear local storage
        localStorage.removeItem('sessionData');
        localStorage.removeItem('teacherProfile');
        localStorage.removeItem('selectedSubject');
        console.log('✓ Session and profile cleared from localStorage');
        
        // Clear session storage
        sessionStorage.clear();
        console.log('✓ Session storage cleared');
        
        console.log('✅ Profile reset complete! Redirecting to login...');
        
        // Redirect to home page
        window.location.href = window.location.origin + window.location.pathname;
        
        return { success: true, message: 'All data cleared successfully' };
    } catch (error) {
        console.error('❌ Error resetting data:', error);
        return { success: false, error: error.message };
    }
}

