# Church Website Maintenance Guide

This guide explains how to casually update your **Blog** and **Archives** even when the site is online.

## 1. Updating the Blog (`blog.html`)

Since the website is currently a static site, adding a new blog post involves adding a small piece of HTML code to `blog.html`.

### How to add a new post:
1. Open `blog.html` in your text editor.
2. Find the `<div id="blogPostsList">` section (around line 125).
3. Copy one of the existing `<div class="blog-post">` blocks.
4. Paste it at the **top** of the list (just after the `<div id="blogPostsList">` tag).
5. Update the content:
   - Change the `<h4>` text to your new **Post Title**.
   - Update the `<span class="post-meta">` with the current **Date** and **Category**.
   - Update the `<p class="post-excerpt">` with your **Message Summary**.

### Example Code Snippet:
```html
<div class="blog-post">
    <div class="post-header">
        <h4 class="post-title">YOUR NEW TITLE HERE</h4>
        <span class="post-status status-published">Published</span>
    </div>
    <div class="post-meta">
        <span><i class="fas fa-calendar"></i> June 25, 2026</span>
        <span><i class="fas fa-folder"></i> Sermon Notes</span>
    </div>
    <p class="post-excerpt">Write a short summary of your message here...</p>
</div>
```

---

## 2. Updating the Archive (`archives.html`)

The archives are managed via a JavaScript file that lists your PDF documents.

### How to add new PDF documents:
1. **Upload the PDF**: Place your new PDF file in the `judah/` or `pdfs/` folder.
2. **Update the List**: Open `script.js/archive.js` (or whichever JS file handles the list). 
3. Add a new entry to the documents array with the name, category, and file path.

---

## 3. Making Changes Go Live

If your website is hosted on **GitHub Pages**:
1. Save your files on your computer.
2. Use GitHub Desktop or the command line to **Commit** and **Push** your changes.
3. The website will automatically update in about 1-2 minutes.

If your website is hosted on **Render** or similar:
1. Push your changes to your linked repository.
2. The service will automatically detect the change and re-deploy.

> [!TIP]
> Always keep a backup of your original files before making manual HTML edits!
