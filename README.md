# 📚 Teaching Progress Tracker PWA

An offline-first Progressive Web App (PWA) for tracking teaching progress for **Basic Computer Knowledge – Level One** at Vocational Training School, Tanzania.

## ✨ Features

### Core Functionality
- **📊 Kanban Board**: Visual 3-column board (Not Started → In Progress → Completed)
- **🎯 Topic Management**: Add, edit, move, and delete teaching topics
- **📈 Progress Tracking**: Monitor periods used vs. planned for each topic
- **💾 Offline Storage**: All data stored locally using IndexedDB
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **⚡ Fast & Lightweight**: No frameworks, pure vanilla JavaScript
- **📦 Installable**: Add to home screen on mobile or install as desktop app
- **📥 Export**: Generate CSV or printable HTML summaries

### Built With
- **HTML5** - Semantic markup
- **CSS3** - Mobile-first responsive design
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **IndexedDB** - Local data persistence
- **Service Workers** - Offline functionality & caching

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- HTTPS connection (for production PWA features)

### Installation

#### Option 1: Local Development
1. Clone or download this repository
2. Open `index.html` in your browser
3. Start tracking teaching progress!

#### Option 2: Deploy to GitHub Pages
1. Push the project to a GitHub repository
2. Go to Settings → Pages → Deploy from main branch
3. Access your app at `https://username.github.io/teaching-progress-pwa`

#### Option 3: Install as App
1. Open the app in your browser
2. **Desktop**: Click the install button in the address bar
3. **Mobile**: Tap the menu → "Add to Home Screen"

## 📖 How to Use

### Adding a New Topic
1. Click **"+ Add Topic"** in any column
2. Fill in the topic details:
   - Topic name (required)
   - Week number
   - Planned periods
   - Periods used
   - Last taught date
   - Next start point
   - Remarks/notes
3. Select the status (Not Started, In Progress, Completed)
4. Click **"Save Topic"**

### Moving Topics Between Columns
- **Drag & Drop**: Click and hold a topic card, then drag to another column
- **Manual Update**: Click the edit button (✏️), change status, and save

### Updating Progress
1. Click the edit button (✏️) on a topic card
2. Update the periods used, last taught date, or notes
3. Click **"Save Topic"**

### Deleting a Topic
1. Click the delete button (🗑️) on a topic card
2. Confirm the deletion

### Exporting Progress
1. Click the **"📥 Export"** button in the header
2. Choose format:
   - **CSV**: For spreadsheet analysis
   - **PDF Summary**: Professional report for supervisors

### Initial Topics
The app comes pre-loaded with 13 core topics:
1. Introduction to Computer
2. Computer Hardware
3. Input Devices
4. Output Devices
5. Storage Devices
6. Software Basics
7. Operating System Basics
8. Keyboard & Mouse Skills
9. File and Folder Management
10. Microsoft Word Basics
11. Computer Safety & Health
12. Internet Basics
13. Revision & Assessment

## 🏗️ Project Structure

```
teaching-progress-pwa/
├── index.html              # Main HTML file with all modals
├── manifest.json           # PWA manifest configuration
├── service-worker.js       # Offline support & caching
├── README.md              # This file
├── SECURITY.md            # Security implementation details
├── SECURITY_QUICK_REF.txt # Security quick reference
├── PASSWORD_RESET_GUIDE.md         # Password reset feature guide
├── PASSWORD_RESET_IMPLEMENTATION.md # Password reset technical docs
├── TOPICS_LIST.txt        # Curriculum topics list
├── css/
│   └── style.css          # Complete styling (mobile-first responsive)
├── js/
│   ├── app.js             # Main app initialization & form handling
│   ├── db.js              # IndexedDB database operations
│   ├── ui.js              # UI rendering, interactions & modals
│   ├── security.js        # Authentication & security functions
│   ├── firebase-config.js # Firebase cloud sync configuration
│   └── service-worker.js  # Service worker for offline support
├── assets/
│   └── images/
│       └── logo.png       # School logo
└── README.md              # This file
```

## 🔄 System Architecture

### Application Layers

```
┌─────────────────────────────────────────────────────────┐
│         USER INTERFACE LAYER (ui.js)                    │
│  - Modals (Login, Create Profile, Add Topic, Settings)  │
│  - Kanban Board rendering and interactions              │
│  - Form handling and validation                         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│      APPLICATION LOGIC LAYER (app.js)                   │
│  - App initialization                                   │
│  - Lesson form submission handling                      │
│  - Notifications and alerts                             │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
┌────────▼──┐  ┌─────▼────┐  ┌──▼──────────┐
│ Security  │  │ Database │  │   Cloud     │
│  (sec.js) │  │ (db.js)  │  │ (firebase)  │
└────┬──────┘  └─────┬────┘  └──┬──────────┘
     │                │          │
     └────────┬───────┴──────────┘
              │
     ┌────────▼──────────┐
     │ Local Storage &   │
     │ IndexedDB & Cloud │
     └──────────────────┘
```

### Data Flow

```
User Action (Login, Add Topic, etc.)
    ↓
Input Validation (security.js)
    ↓
Form Submission (app.js)
    ↓
Database Operation (db.js)
    ├─→ Local Storage (IndexedDB)
    └─→ MANDATORY Cloud Sync (firebase-config.js - auto-sync enabled)
    ↓
UI Update (ui.js)
    ↓
Display to User with Sync Status
```

## 📁 File Descriptions

### Core Files

#### `index.html` (487 lines)
**Purpose**: Main HTML structure  
**Contains**:
- Header with logo, title, and action buttons
- Authentication modals (Login, Create Profile, Forgot Password)
- Main Kanban board with 3 columns
- Topic form modal
- Settings, export, and reset modals
- Footer

#### `js/app.js` (310 lines)
**Purpose**: Main application logic and initialization  
**Responsibilities**:
- App startup and initialization
- Database initialization
- Session validation on load
- Lesson form submission handling
- Cloud sync coordination
- Error handling
**Key Functions**:
- `DOMContentLoaded` event handler
- Form submission listener
- Cloud sync integration

#### `js/ui.js` (1803 lines)
**Purpose**: User interface rendering and interactions  
**Responsibilities**:
- DOM element management
- Modal opening/closing
- Kanban board rendering
- Drag & drop functionality
- Form interactions
- Profile management
- Export functionality
- Password reset UI
**Key Functions**:
- `renderAllColumns()` - Render kanban board
- `openLoginModal()`, `closeLoginModal()`
- `createLessonCard()` - Create lesson cards
- `openForgotPasswordModal()` - Password reset UI

#### `js/db.js` (776 lines)
**Purpose**: IndexedDB database operations  
**Responsibilities**:
- Database initialization and versioning
- CRUD operations (Create, Read, Update, Delete)
- Query operations (get by status, ID, etc.)
- Lesson seeding with curriculum
- Duplicate detection
**Key Functions**:
- `initDB()` - Initialize database
- `saveLessonToDB()` - Save/update lesson
- `getAllLessons()` - Get all lessons
- `getLessonsByStatus()` - Filter lessons
- `deleteLessonFromDB()` - Delete lesson
- `seedInitialLessons()` - Load curriculum

#### `js/security.js` (430 lines)
**Purpose**: Authentication and security  
**Responsibilities**:
- User authentication and login
- Rate limiting and account lockout
- Input validation and sanitization
- Session management
- Password requirements enforcement
- Bypass prevention
- Password reset verification
**Key Functions**:
- `secureLogin()` - Validate login attempt
- `validateUsername()` - Check username format
- `validatePassword()` - Check password strength
- `createSecureSession()` - Create session
- `isSessionValid()` - Check session validity
- `verifyIdentity()` - Verify for password reset
- `resetPassword()` - Update password

#### `js/firebase-config.js` (276 lines)
**Purpose**: Firebase cloud synchronization  
**Responsibilities**:
- Firebase initialization
- User authentication (cloud)
- Cloud data sync (push/pull)
- Real-time sync listeners
**Key Functions**:
- `signUpTeacher()` - Register in Firebase
- `loginTeacher()` - Cloud authentication
- `saveLessonToCloud()` - Sync to Firebase
- `getAllLessonsFromCloud()` - Get cloud data
- `smartSync()` - Two-way sync

### Styling

#### `css/style.css` (600+ lines)
**Purpose**: Complete application styling  
**Features**:
- CSS custom properties (variables)
- Mobile-first responsive design
- Flexbox and Grid layouts
- Drag & drop styling
- Modal styles
- Color scheme and themes
- Print styles for PDF export

### Configuration Files

#### `manifest.json`
**Purpose**: PWA configuration  
**Contains**:
- App name and description
- App icons
- Theme colors
- Display mode
- Start URL
- Screenshot URLs

#### `service-worker.js`
**Purpose**: Offline support  
**Features**:
- Cache strategies
- Network requests handling
- Offline fallback
- Background sync

---

## 📊 Data Models

### Lesson Object
```javascript
{
  id: number,                                    // Auto-generated by IndexedDB
  topic: string,                                 // Topic title (required)
  week: number || null,                          // Week number 1-52
  status: "not-started" | "in-progress" | "completed",
  periodsPlanned: number,                        // Total periods (default: 2)
  periodsUsed: number,                           // Periods taught (default: 0)
  lastTaught: string,                            // Date YYYY-MM-DD format
  nextStart: string,                             // e.g., "Page 3, Exercise 5"
  remarks: string                                // Notes and comments
}
```

### Teacher Profile Object
```javascript
{
  teacherName: string,                           // Teacher's full name
  subjectName: string,                           // Vocational subject
  password: string,                              // Hashed password
  schoolName: string,                            // School name (optional)
  email: string,                                 // Email address
  phone: string,                                 // Phone number
  classroom: string,                             // Class/Level (e.g., "Level One")
  uid: string                                    // Firebase UID (if cloud user)
}
```

### Session Object
```javascript
{
  username: string,                              // Teacher name
  uid: string,                                   // User ID (local or Firebase)
  loginTime: number,                             // Timestamp of login
  lastActivity: number,                          // Last activity timestamp
  deviceId: string,                              // Device fingerprint
  sessionToken: string                           // Unique session token
}
```

---

## 🔐 Security Architecture

```
┌──────────────────────────────────────────────────────┐
│          Input Validation & Sanitization            │
│  - Username: 2-50 chars, alphanumeric               │
│  - Password: 8+ chars with complexity requirements  │
│  - Remove HTML/script injection attempts            │
└────────────────┬─────────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────────┐
│      Rate Limiting & Account Lockout                │
│  - 5 failed attempts = 15 min lockout               │
│  - Device-based tracking (fingerprinting)           │
│  - Automatic unlock after timeout                   │
└────────────────┬─────────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────────┐
│        Session Management & Validation              │
│  - Unique session tokens per login                  │
│  - Device fingerprint verification                  │
│  - 30-minute inactivity timeout                     │
│  - Activity tracking (mouse, keyboard, click)       │
└────────────────┬─────────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────────┐
│      Password Reset Verification                    │
│  - Identity check (name + email/phone)              │
│  - Strong password requirements for reset           │
│  - Login attempt counter reset on reset             │
└──────────────────────────────────────────────────────┘
```

---

## 🔄 Request/Response Flow

### Login Flow
```
1. User enters credentials
   ↓
2. Input validation (security.js)
   ├─ Check rate limiting
   ├─ Validate username format
   ├─ Validate password format
   └─ Check account lockout status
   ↓
3. Firebase authentication (if online)
   ├─ Send credentials to Firebase
   ├─ Get user UID
   └─ Pull cloud data if available
   ↓
4. Local authentication (fallback)
   ├─ Get stored profile
   ├─ Compare credentials
   ├─ Match status and password
   ↓
5. Create secure session
   ├─ Generate session token
   ├─ Store device fingerprint
   ├─ Start timeout counter
   └─ Record successful login
   ↓
6. Load data and show app
```

### Add/Edit Lesson Flow
```
1. User opens lesson form
   ↓
2. Validate session (security.js)
   ├─ Check session exists
   ├─ Verify device fingerprint
   └─ Check timeout not expired
   ↓
3. User submits form
   ↓
4. Validate input (app.js)
   ├─ Required fields check
   ├─ Format validation
   └─ Sanitize user input
   ↓
5. Save to local database (db.js)
   ├─ IndexedDB save operation
   ├─ Get returned lesson ID
   └─ Update in-memory cache
   ↓
6. Sync to cloud (firebase-config.js - if online)
   ├─ Push to Firebase
   ├─ Show sync indicator
   └─ Handle errors
   ↓
7. Re-render UI (ui.js)
   ├─ Update kanban board
   ├─ Clear form
   └─ Show success message
```

### Export Flow
```
1. User clicks export button
   ↓
2. Choose format (CSV or PDF)
   ↓
3. Get all lessons from database
   ↓
4. Format data
   ├─ CSV: Comma-separated values
   └─ PDF: HTML to PDF conversion
   ↓
5. Trigger download
   ├─ Create blob with data
   ├─ Generate download link
   └─ Simulate click
```

---

## 🗄️ Database Schema

### IndexedDB Structure
```
Database: TeachingProgressDB (v1)

Store: lessons
  ├─ KeyPath: id (auto-increment)
  └─ Indexes:
      ├─ status (not-started, in-progress, completed)
      └─ week (week number 1-52)

Profile Storage: localStorage
  ├─ Key: teacherProfile
  └─ Value: JSON stringified teacher profile

Session Storage: localStorage
  ├─ Key: sessionData
  └─ Value: JSON stringified session object

Security Storage: localStorage
  ├─ login_attempts_{deviceId}
  └─ login_lock_{deviceId}
```

---

## 🔌 External Dependencies

### Firebase (MANDATORY Cloud Sync & Authentication)
**Firebase is NOW MANDATORY** - All data is automatically synchronized to the cloud.
- `firebase-app.js` - Firebase core
- `firebase-auth.js` - Authentication required for login
- `firebase-firestore.js` - Real-time cloud database for automatic sync

**Key Features**:
- ✅ MANDATORY: All users must authenticate via Firebase
- ✅ AUTOMATIC: Data automatically syncs to cloud on every save
- ✅ QUEUING: Offline operations queue and sync when back online
- ✅ REAL-TIME: Cloud changes sync back to app automatically
- ✅ NO CHOICE: Local-only operation not supported

### No Other Dependencies
- ✅ No frameworks (React, Vue, Angular)
- ✅ No jQuery or utility libraries
- ✅ No external CSS frameworks
- ✅ Pure vanilla JavaScript and CSS



## 💾 Data Storage

All data is stored locally in your browser using **IndexedDB**:
- No data sent to any server
- All data persists across browser sessions
- Works completely offline after first load
- No account or login required

### Lesson Data Model
```javascript
{
  id: number,                                    // Auto-generated
  topic: string,                                 // e.g., "Introduction to Computer"
  week: number,                                  // Week number (1-52)
  status: "not-started" | "in-progress" | "completed",
  periodsPlanned: number,                        // Total periods allocated
  periodsUsed: number,                           // Periods spent teaching
  lastTaught: string (YYYY-MM-DD),              // Date last taught
  nextStart: string,                             // e.g., "Page 3, Exercise 5"
  remarks: string                                // Additional notes
}
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+N` or `Cmd+N` | Add new topic |
| `Esc` | Close any modal |

## 🌐 PWA Features

### Service Worker
- Caches all app assets on first load
- Serves cached content when offline
- Automatically updates cache when back online
- Graceful fallback for network failures

### Manifest File
- Defines app name, icons, and theme colors
- Enables installation on home screen
- Sets display mode as standalone app

### Offline Functionality
- All features work without internet
- Data syncs when connection returns
- Status indicator shows online/offline state

## 📊 Export Features

### CSV Export
- Includes all lessons with status and progress
- Compatible with Excel, Google Sheets, LibreOffice
- Sorted by week number
- Contains: Topic, Week, Status, Periods, % Complete, Last Taught, Notes

### PDF Summary
- Professional-looking progress report
- Includes summary statistics (Completed, In Progress, Not Started)
- Detailed table of all topics
- Ready for supervisor review

## 🔧 Browser Support

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Edge | ✅ | ✅ |
| IE 11 | ❌ | N/A |

**Note**: PWA features (installation, offline support) require:
- HTTPS connection
- Service Worker support
- IndexedDB support

## 🐛 Debugging

Open the browser console and use these functions:

```javascript
// Get all lessons
window.debugApp.getAllLessons()

// Export to CSV
window.debugApp.exportToCSV()

// Clear all data (irreversible)
window.debugApp.clearDatabase()

// Reload data
window.debugApp.reloadData()
```

## 📝 Tips for Teachers

1. **Update after each period**: Record periods used to track progress
2. **Add notes**: Use the "Next Start Point" field to remember where to continue
3. **Regular exports**: Export progress monthly for your records
4. **Mobile-friendly**: Check progress on your phone during planning
5. **No backups needed**: Data is safe in IndexedDB; refresh doesn't delete it

## 🔒 Privacy & Security

- ✅ All data stored locally - no cloud uploads
- ✅ No tracking or analytics
- ✅ No personal data collection
- ✅ No ads or third-party scripts
- ✅ Works completely offline
- ✅ Open source (no proprietary code)

## 📱 Mobile App Installation

### iOS (Safari)
1. Open the app in Safari
2. Tap the Share button (↗️)
3. Scroll down and tap "Add to Home Screen"
4. Choose a name and tap "Add"

### Android (Chrome)
1. Open the app in Chrome
2. Tap the menu (⋮)
3. Tap "Install app" or "Add to Home Screen"
4. Confirm installation

## 🤝 Contributing

Suggestions for improvements:
- Add more topics based on curriculum updates
- Implement backup/restore functionality
- Add multiple class support
- Implement progress statistics and charts

## 📄 License

This project is open source and available for use in educational contexts.

**Created for**: Vocational Training School, Tanzania  
**Purpose**: Empower teachers with better progress tracking tools  
**Status**: MVP Complete

## 📞 Support

For issues or questions:
1. Check browser console for error messages (`F12`)
2. Ensure you're using a supported browser
3. Try clearing browser cache and reloading
4. Check that IndexedDB is enabled in browser

---

**Made with 💙 for teachers** | *Offline-first • Privacy-focused • Teacher-tested*
