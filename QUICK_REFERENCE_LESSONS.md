# 🚀 Quick Reference: Adding Quarterly Lessons

## 📋 Before You Start
- [ ] Have your lesson PDF ready
- [ ] Know which quarter (Q1, Q2, Q3, or Q4)
- [ ] Have a text editor ready (Notepad++, VS Code, etc.)

---

## ⚡ Quick Add (3 Steps)

### 1️⃣ Upload PDF
Place your PDF in the `lessons` folder:
```
lessons/Lesson 2nd quarter 2026.pdf
```

### 2️⃣ Edit Archive.js
Open `script.js/Archive.js` and find the quarter (around line 115):

```javascript
2: { // Q2 (April - June)
    title: "Second Quarter 2026",
    available: true,  // ← Change to true
    lessons: [        // ← Add your lesson here
        {
            id: "q2-1",
            title: "Second Quarter Lesson 2026",
            date: "April - June 2026",
            description: "Your description here",
            memoryVerse: "Your verse - Reference",
            pdfUrl: "lessons/Lesson 2nd quarter 2026.pdf"
        }
    ]
}
```

### 3️⃣ Publish
```bash
git add script.js/Archive.js lessons/
git commit -m "Added Q2 2026 lesson"
git push origin main
```

---

## 🎯 Template to Copy-Paste

```javascript
{
    id: "q2-1",
    title: "LESSON TITLE HERE",
    date: "MONTH RANGE HERE",
    description: "DESCRIPTION HERE",
    memoryVerse: "VERSE TEXT - REFERENCE",
    pdfUrl: "lessons/YOUR-FILE-NAME.pdf"
}
```

---

## 📅 Quarter Reference

| Quarter | Months | ID Prefix |
|---------|--------|-----------|
| Q1 | Jan - Mar | q1-1, q1-2... |
| Q2 | Apr - Jun | q2-1, q2-2... |
| Q3 | Jul - Sep | q3-1, q3-2... |
| Q4 | Oct - Dec | q4-1, q4-2... |

---

## 🔧 Browser Console Method (Live Site)

If you need to add a lesson without editing files:

1. Press **F12** on your archives page
2. Click **Console** tab
3. Paste this command:

```javascript
addBibleLesson('2', {
    title: "Second Quarter Lesson 2026",
    date: "April - June 2026",
    description: "Your description",
    memoryVerse: "Your verse - Reference",
    pdfUrl: "lessons/Lesson 2nd quarter 2026.pdf"
});
```

⚠️ **Note**: This only saves to the visitor's browser. You still need to edit `Archive.js` for permanent changes.

---

## ✅ Checklist After Adding

- [ ] PDF file uploaded to `lessons` folder
- [ ] `available: true` for the quarter
- [ ] All fields filled (id, title, date, description, memoryVerse, pdfUrl)
- [ ] File path matches actual PDF location
- [ ] Changes committed and pushed to GitHub
- [ ] Tested on live site (clear cache: Ctrl+Shift+R)

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Lesson not showing | Check `available: true` and clear cache |
| PDF won't open | Verify file path and name |
| Syntax error | Check for missing commas and brackets |
| Changes not live | Wait 2 minutes for GitHub Pages rebuild |

---

## 📞 Need More Help?

See the complete guide: **HOW_TO_ADD_LESSONS.md**

---

**Last Updated**: February 2026
