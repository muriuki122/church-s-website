# How to Add Quarterly Bible Lessons to Your Website

This guide will help you add new quarterly lessons to your church website, even when it's already online.

## 📋 Overview

Your website has a Bible Lessons sidebar on the Archives page that displays quarterly lessons. The lessons are organized by quarters (Q1, Q2, Q3, Q4) and stored in the `lessons` folder.

## 🔧 What Was Fixed

The original issue was in the `Archive.js` file where the lessons data structure was incorrect:
- **Problem**: `lessons` was defined as a single object instead of an array
- **Problem**: Missing `memoryVerse` field
- **Solution**: Changed to an array structure and added all required fields

## 📁 File Structure

```
CHURCH'S WEBSITE/
├── lessons/                          # Store all lesson PDFs here
│   └── Lesson 1st quarter 2026- FINAL.pdf
├── script.js/
│   └── Archive.js                    # Main JavaScript file
└── archives.html                     # Archives page
```

## ✅ Step-by-Step: Adding New Quarterly Lessons

### Method 1: Direct File Editing (Recommended for Tech-Savvy Users)

#### Step 1: Upload Your PDF
1. Place your lesson PDF in the `lessons` folder
2. Use a clear naming convention, e.g., `Lesson 2nd quarter 2026.pdf`

#### Step 2: Edit Archive.js
1. Open `script.js/Archive.js` in a text editor
2. Find the `bibleLessons` object (around line 115)
3. Locate the quarter you want to update (1, 2, 3, or 4)

#### Step 3: Add Your Lesson Data
Replace the empty quarter structure with your lesson information:

```javascript
2: { // Q2 (April - June)
    title: "Second Quarter 2026",
    available: true,  // Change from false to true
    lessons: [
        {
            id: "q2-1",
            title: "Second Quarter Lesson 2026",
            date: "April - June 2026",
            description: "Your lesson description here",
            memoryVerse: "Your memory verse here - Book Chapter:Verse",
            pdfUrl: "lessons/Lesson 2nd quarter 2026.pdf"
        }
    ]
}
```

#### Step 4: Save and Upload
1. Save the `Archive.js` file
2. Upload it to your website (replace the old version)
3. Clear your browser cache and refresh the page

### Method 2: Using Browser Console (For Live Website)

If your website is already online and you want to add lessons without editing files:

#### Step 1: Upload the PDF
Upload your lesson PDF to the `lessons` folder on your server

#### Step 2: Open Browser Console
1. Go to your archives page
2. Press `F12` or right-click → Inspect
3. Click on the "Console" tab

#### Step 3: Run This Command
```javascript
addBibleLesson('2', {
    title: "Second Quarter Lesson 2026",
    date: "April - June 2026",
    description: "Your lesson description here",
    memoryVerse: "Your memory verse here - Book Chapter:Verse",
    pdfUrl: "lessons/Lesson 2nd quarter 2026.pdf"
});
```

**Note**: Replace `'2'` with the quarter number (1, 2, 3, or 4)

This will:
- Add the lesson to the current page
- Save it to browser's localStorage
- Make it visible immediately

⚠️ **Important**: This method only saves to the visitor's browser. To make it permanent for all visitors, you must also edit the `Archive.js` file as described in Method 1.

## 📝 Lesson Data Fields Explained

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Unique identifier | `"q2-1"` (quarter-lesson number) |
| `title` | Lesson title | `"Second Quarter Lesson 2026"` |
| `date` | Date range | `"April - June 2026"` |
| `description` | Brief description | `"Quarterly Bible study lessons..."` |
| `memoryVerse` | Memory verse with reference | `"Study to shew thyself approved unto God - 2 Timothy 2:15"` |
| `pdfUrl` | Path to PDF file | `"lessons/Lesson 2nd quarter 2026.pdf"` |

## 🎯 Adding Multiple Lessons to One Quarter

If you have multiple lessons for a single quarter:

```javascript
2: { // Q2 (April - June)
    title: "Second Quarter 2026",
    available: true,
    lessons: [
        {
            id: "q2-1",
            title: "Lesson 1: Faith",
            date: "Week 1 - April 2026",
            description: "Understanding faith",
            memoryVerse: "Faith is the substance... - Hebrews 11:1",
            pdfUrl: "lessons/Q2-Lesson-1-Faith.pdf"
        },
        {
            id: "q2-2",
            title: "Lesson 2: Hope",
            date: "Week 2 - April 2026",
            description: "Understanding hope",
            memoryVerse: "Hope does not disappoint - Romans 5:5",
            pdfUrl: "lessons/Q2-Lesson-2-Hope.pdf"
        }
        // Add more lessons as needed
    ]
}
```

## 🔄 Updating Existing Lessons

### Using Browser Console:
```javascript
updateBibleLesson('1', 'q1-1', {
    title: "Updated Title",
    description: "Updated description"
});
```

### Or edit the file directly in `Archive.js`

## 🗑️ Removing a Lesson

### Using Browser Console:
```javascript
removeBibleLesson('1', 'q1-1');
```

### Or remove it from the array in `Archive.js`

## 🌐 Publishing to GitHub Pages

If you're using GitHub Pages:

1. **Commit your changes**:
   ```bash
   git add lessons/
   git add script.js/Archive.js
   git commit -m "Added Q2 2026 lessons"
   ```

2. **Push to GitHub**:
   ```bash
   git push origin main
   ```

3. **Wait for deployment** (usually 1-2 minutes)

4. **Clear cache and refresh** your website

## 🐛 Troubleshooting

### Lesson not showing up?

1. **Check the PDF path**: Make sure the PDF file exists in the `lessons` folder
2. **Check the quarter**: Verify you're looking at the correct quarter tab (Q1, Q2, Q3, Q4)
3. **Check `available` flag**: Make sure it's set to `true`
4. **Clear browser cache**: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
5. **Check browser console**: Press F12 and look for any error messages

### PDF won't open?

1. **Verify file path**: The path should be relative to the website root
2. **Check file name**: Make sure there are no special characters or spaces (use hyphens or underscores)
3. **Test direct link**: Try accessing `yourwebsite.com/lessons/filename.pdf` directly

### Changes not appearing online?

1. **Clear browser cache**
2. **Check if file was uploaded** to the server
3. **Wait for GitHub Pages** to rebuild (if using GitHub)
4. **Check file permissions** on your server

## 📞 Quick Reference

### Current Quarter Detection
The website automatically detects the current quarter based on the date:
- **Q1**: January - March
- **Q2**: April - June
- **Q3**: July - September
- **Q4**: October - December

### File Naming Convention
Recommended format: `Lesson-[Quarter]-[Year].pdf`
- Example: `Lesson-Q2-2026.pdf`
- Or: `Lesson 2nd quarter 2026.pdf`

## ✨ Tips for Best Results

1. **Use descriptive titles**: Help users understand what each lesson covers
2. **Keep PDFs optimized**: Compress large PDFs for faster loading
3. **Test before publishing**: Always test on a local copy first
4. **Backup regularly**: Keep copies of your lesson files
5. **Update quarterly**: Add new lessons at the start of each quarter

## 🎓 Example: Complete Quarter Setup

Here's a complete example for Q3 2026:

```javascript
3: { // Q3 (July - September)
    title: "Third Quarter 2026",
    available: true,
    lessons: [
        {
            id: "q3-1",
            title: "Third Quarter Lesson 2026",
            date: "July - September 2026",
            description: "Exploring the prophetic books and their relevance today.",
            memoryVerse: "Surely the Lord ELOHIM will do nothing, but he revealeth his secret unto his servants the prophets - Amos 3:7",
            pdfUrl: "lessons/Lesson 3rd quarter 2026.pdf"
        }
    ]
}
```

---

**Need Help?** If you encounter any issues, check the browser console (F12) for error messages, or contact your web developer.

**Last Updated**: February 2026
