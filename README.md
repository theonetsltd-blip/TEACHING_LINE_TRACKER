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
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest configuration
├── service-worker.js       # Offline support & caching
├── css/
│   └── style.css          # Complete styling (mobile-first)
├── js/
│   ├── app.js             # Main app logic & initialization
│   ├── db.js              # IndexedDB operations
│   └── ui.js              # UI rendering & interactions
└── README.md              # This file
```

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
