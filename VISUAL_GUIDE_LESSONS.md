# 📊 Bible Lessons Structure - Visual Guide

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    CHURCH WEBSITE STRUCTURE                      │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   lessons/   │ ───▶ │  Archive.js  │ ───▶ │ archives.html│
│  (PDF Files) │      │ (JavaScript) │      │ (Web Page)   │
└──────────────┘      └──────────────┘      └──────────────┘
     STEP 1               STEP 2                STEP 3
  Upload PDF         Edit Code Data         Display to Users
```

---

## 📁 Step 1: File Storage

```
CHURCH'S WEBSITE/
│
├── lessons/                              ← Store PDFs here
│   ├── Lesson 1st quarter 2026- FINAL.pdf  ✓ Q1 (Current)
│   ├── Lesson 2nd quarter 2026.pdf         ○ Q2 (Add next)
│   ├── Lesson 3rd quarter 2026.pdf         ○ Q3 (Future)
│   └── Lesson 4th quarter 2026.pdf         ○ Q4 (Future)
│
├── script.js/
│   └── Archive.js                        ← Edit this file
│
└── archives.html                         ← Users see this
```

---

## 💾 Step 2: Data Structure in Archive.js

```javascript
const bibleLessons = {
    
    1: {  // ◄── QUARTER 1 (Jan-Mar)
        title: "First Quarter 2026",
        available: true,  // ◄── Must be TRUE to show
        lessons: [        // ◄── ARRAY of lessons
            {
                id: "q1-1",
                title: "First Quarter Lesson 2026",
                date: "January - March 2026",
                description: "Quarterly Bible study...",
                memoryVerse: "Study to shew thyself...",
                pdfUrl: "lessons/Lesson 1st quarter 2026- FINAL.pdf"
            }
            // Add more lessons here if needed
        ]
    },
    
    2: {  // ◄── QUARTER 2 (Apr-Jun)
        title: "Second Quarter 2026",
        available: false,  // ◄── Change to TRUE when ready
        lessons: []        // ◄── Add lessons here
    },
    
    3: {  // ◄── QUARTER 3 (Jul-Sep)
        title: "Third Quarter 2026",
        available: false,
        lessons: []
    },
    
    4: {  // ◄── QUARTER 4 (Oct-Dec)
        title: "Fourth Quarter 2026",
        available: false,
        lessons: []
    }
};
```

---

## 🌐 Step 3: Website Display

```
┌─────────────────────────────────────────────────────────────┐
│                    ARCHIVES PAGE                             │
│  ┌────────────────────┐  ┌──────────────────────────────┐  │
│  │                    │  │   📖 Bible Lessons           │  │
│  │  Main Document     │  │  ┌────────────────────────┐  │  │
│  │  Grid              │  │  │ [Q1] Q2  Q3  Q4       │  │  │
│  │                    │  │  └────────────────────────┘  │  │
│  │  • Books           │  │                              │  │
│  │  • Tracts          │  │  ┌──────────────────────┐   │  │
│  │  • Judah           │  │  │ First Quarter 2026   │   │  │
│  │                    │  │  └──────────────────────┘   │  │
│  │                    │  │                              │  │
│  │                    │  │  ┌────────────────────────┐ │  │
│  │                    │  │  │ 📄 Lesson Card         │ │  │
│  │                    │  │  │                        │ │  │
│  │                    │  │  │ Title: First Quarter   │ │  │
│  │                    │  │  │ Date: Jan - Mar 2026   │ │  │
│  │                    │  │  │ Description: ...       │ │  │
│  │                    │  │  │ Memory Verse: ...      │ │  │
│  │                    │  │  │                        │ │  │
│  │                    │  │  │ [View] [Download]      │ │  │
│  │                    │  │  └────────────────────────┘ │  │
│  └────────────────────┘  └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

```
1. USER UPLOADS PDF
   │
   ▼
   lessons/Lesson 2nd quarter 2026.pdf
   │
   │
2. ADMIN EDITS Archive.js
   │
   ▼
   bibleLessons[2].available = true
   bibleLessons[2].lessons = [{ ... }]
   │
   │
3. WEBSITE READS DATA
   │
   ▼
   Archive.js loads on page
   │
   │
4. JAVASCRIPT RENDERS
   │
   ▼
   Creates lesson card in sidebar
   │
   │
5. USER SEES LESSON
   │
   ▼
   Clicks "View Lesson" or "Download"
   │
   │
6. PDF OPENS
   │
   ▼
   Modal shows PDF or downloads file
```

---

## 🎯 Lesson Object Anatomy

```javascript
{
    id: "q2-1",           // ◄── Unique identifier
    │                     //     Format: q[quarter]-[number]
    │
    title: "...",         // ◄── Shown as main heading
    │
    date: "...",          // ◄── Shown in small badge
    │
    description: "...",   // ◄── Brief summary text
    │
    memoryVerse: "...",   // ◄── Shown in highlighted box
    │
    pdfUrl: "lessons/..." // ◄── Path to PDF file
}
```

---

## 🔀 Multiple Lessons Per Quarter

```javascript
2: {
    title: "Second Quarter 2026",
    available: true,
    lessons: [
        {
            id: "q2-1",        // ◄── Lesson 1
            title: "Week 1: Faith",
            // ...
        },
        {
            id: "q2-2",        // ◄── Lesson 2
            title: "Week 2: Hope",
            // ...
        },
        {
            id: "q2-3",        // ◄── Lesson 3
            title: "Week 3: Love",
            // ...
        }
    ]
}
```

Each lesson gets its own card in the sidebar!

---

## ⚠️ Common Mistakes to Avoid

### ❌ WRONG - Single Object
```javascript
lessons: {              // ← Missing brackets!
    id: "q2-1",
    title: "..."
}
```

### ✅ CORRECT - Array of Objects
```javascript
lessons: [              // ← Square brackets!
    {
        id: "q2-1",
        title: "..."
    }
]
```

---

### ❌ WRONG - Missing Comma
```javascript
{
    id: "q2-1",
    title: "Lesson 1"   // ← Missing comma!
    date: "April 2026"
}
```

### ✅ CORRECT - With Comma
```javascript
{
    id: "q2-1",
    title: "Lesson 1",  // ← Comma here!
    date: "April 2026"
}
```

---

### ❌ WRONG - Forgot to Set Available
```javascript
2: {
    title: "Second Quarter 2026",
    available: false,    // ← Still false!
    lessons: [{ ... }]
}
```

### ✅ CORRECT - Set to True
```javascript
2: {
    title: "Second Quarter 2026",
    available: true,     // ← Changed to true!
    lessons: [{ ... }]
}
```

---

## 📅 Quarter Auto-Detection

The website automatically shows the current quarter:

```
Current Date         Active Quarter
─────────────────────────────────────
Jan 1  - Mar 31  →   Q1
Apr 1  - Jun 30  →   Q2
Jul 1  - Sep 30  →   Q3
Oct 1  - Dec 31  →   Q4
```

Users can still click other quarter tabs to see past/future lessons!

---

## 🚀 Publishing Workflow

```
┌──────────────┐
│ 1. Local     │  Edit files on your computer
│    Changes   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 2. Git       │  git add, commit, push
│    Commit    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 3. GitHub    │  Automatic deployment
│    Pages     │  (1-2 minutes)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 4. Live      │  Users see changes
│    Website   │  (after cache clear)
└──────────────┘
```

---

## 🎓 Example: Adding Q2 Lesson

### Before:
```javascript
2: {
    title: "Second Quarter 2026",
    available: false,
    lessons: []
}
```

### After:
```javascript
2: {
    title: "Second Quarter 2026",
    available: true,  // ◄── Changed
    lessons: [        // ◄── Added lesson
        {
            id: "q2-1",
            title: "Second Quarter Lesson 2026",
            date: "April - June 2026",
            description: "Exploring the prophetic books",
            memoryVerse: "Thy word is a lamp - Psalm 119:105",
            pdfUrl: "lessons/Lesson 2nd quarter 2026.pdf"
        }
    ]
}
```

### Result:
- Q2 tab becomes clickable
- Lesson card appears in sidebar
- Users can view and download PDF

---

## 📞 Quick Help

| Issue | Check |
|-------|-------|
| Lesson not showing | `available: true`? |
| PDF won't open | File path correct? |
| Syntax error | Missing comma/bracket? |
| Changes not live | Pushed to GitHub? |

---

**For detailed instructions, see: HOW_TO_ADD_LESSONS.md**

**Last Updated**: February 2026
