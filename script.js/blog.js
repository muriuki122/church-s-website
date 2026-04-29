document.addEventListener('DOMContentLoaded', function () {
    const postsList = document.getElementById('blogPostsList');

    // --- 1. STATIC FEATURED POSTS ---
    const staticPosts = [
        {
            id: 'static-1',
            title: "Exploring 'Babylon Mystery Religion'",
            category: "devotional",
            author: "Church Media",
            publishDate: "2026-02-15",
            content: "We are pleased to highlight 'Babylon Mystery Religion' by Ralph Woodrow as a featured study in our archive. This book provides a deep dive into historical religious traditions and their biblical context. You can read the full text in our Archives section.",
            status: 'published',
            isStatic: true,
            pdfUrl: "pdfs/Babylon-Mystery-Religion-by-Ralph-Woodrow-1981.pdf"
        },
        {
            id: 'static-2',
            title: "The Legacy of 'A History of the True Church'",
            category: "news",
            author: "Church Media",
            publishDate: "2026-02-14",
            content: "Dive into the resilience of faith with Dugger and Dodd's monumental work. This history book traces the journey of the faithful through the centuries. Available now for full preview in our digital library.",
            status: 'published',
            isStatic: true,
            pdfUrl: "pdfs/A-History-of-the-True-Church-Dugger-and-Dodd.pdf"
        },
        {
            id: 'static-3',
            title: "Study Guide: The Bible Home Instructor",
            category: "sermon",
            author: "Church Media",
            publishDate: "2026-02-13",
            content: "Looking for family study material? 'The Bible Home Instructor' offers practical biblical guidance for every household. Discover this treasure in our Archives today.",
            status: 'published',
            isStatic: true,
            pdfUrl: "pdfs/THE-BIBLE-HOME-INSTRUCTOR.pdf"
        },
        {
            id: 'static-4',
            title: "Historical Research: The Two Babylons",
            category: "devotional",
            author: "Church Media",
            publishDate: "2026-02-12",
            content: "Alexander Hislop's classic research is a cornerstone of our historical collection. We've made it easier than ever to access this research directly through our mobile-optimized archive viewer.",
            status: 'published',
            isStatic: true,
            pdfUrl: "pdfs/The-Two-Babylons.pdf"
        },
        {
            id: 'static-5',
            title: "Judah Bulletin November 1960",
            category: "archive",
            author: "Church Media",
            publishDate: "2026-04-30",
            content: "A historical issue of the Judah bulletin providing insights and teachings from November 1960. View directly inline on our website.",
            status: 'published',
            isStatic: true,
            pdfUrl: "judah/Judah-1960-Bul-November.pdf"
        },
        {
            id: 'static-6',
            title: "Judah Nov/Dec Volume 82",
            category: "archive",
            author: "Church Media",
            publishDate: "2026-04-30",
            content: "Historical perspective and teachings from the Judah Nov/Dec Volume 82.",
            status: 'published',
            isStatic: true,
            pdfUrl: "judah/Judah-82-NovDec.pdf"
        },
        {
            id: 'static-7',
            title: "Judah August Volume 86",
            category: "archive",
            author: "Church Media",
            publishDate: "2026-04-30",
            content: "Explore the teachings from Judah August Volume 86 in our digital viewer.",
            status: 'published',
            isStatic: true,
            pdfUrl: "judah/Judah-86Aug.pdf"
        },
        {
            id: 'static-8',
            title: "Judah Volume 90",
            category: "archive",
            author: "Church Media",
            publishDate: "2026-04-29",
            content: "Access the full text of Judah Volume 90 in this exclusive digital archive release.",
            status: 'published',
            isStatic: true,
            pdfUrl: "judah/Judah-90.pdf"
        },
        {
            id: 'static-9',
            title: "Judah Volume 91",
            category: "archive",
            author: "Church Media",
            publishDate: "2026-04-29",
            content: "Read the historical teachings and community messages in Judah Volume 91.",
            status: 'published',
            isStatic: true,
            pdfUrl: "judah/Judah-91.pdf"
        }
    ];

    // --- 2. REST API SYNC ---
    async function fetchPosts() {
        console.log("Fetching blog posts from Python API...");
        try {
            const response = await fetch('http://localhost:5000/api/posts');
            const dynamicPosts = await response.json();

            console.log(`Received ${dynamicPosts.length} posts from API.`);

            // Combine and sort (static posts act as baseline)
            const allPosts = [...dynamicPosts, ...staticPosts].sort((a, b) =>
                new Date(b.publishDate) - new Date(a.publishDate)
            );

            postsList.innerHTML = '';
            if (allPosts.length === 0) {
                postsList.innerHTML = '<div class="empty-state"><p>No messages have been published yet.</p></div>';
                return;
            }

            allPosts.forEach((post) => {
                addNewPostToList(post, post.id);
            });
        } catch (error) {
            console.error("API ERROR during fetchPosts:", error);
            showToast('Sync Error', 'Could not connect to the church server. Showing offline content.', 'error');

            // Fallback to static if error
            postsList.innerHTML = '';
            staticPosts.forEach(post => addNewPostToList(post, post.id));
        }
    }

    // Save post to Python API
    async function savePostToFirestore(postData) {
        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });
            const result = await response.json();
            if (result.success) {
                showToast('Post Published', 'Your blog post has been shared with the community.', 'success');
                if (blogForm) blogForm.reset();
                const today = new Date().toISOString().split('T')[0];
                const publishDateInput = document.getElementById('publishDate');
                if (publishDateInput) publishDateInput.value = today;
                fetchPosts(); // Refresh list
            } else {
                throw new Error(result.message || 'Failed to save post');
            }
        } catch (error) {
            showToast('Error', error.message, 'error');
        }
    }

    // --- 3. FORM HANDLING ---
    const blogForm = document.getElementById('blogForm');
    if (blogForm) {
        blogForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const postData = {
                title: document.getElementById('blogTitle').value,
                category: document.getElementById('blogCategory').value,
                tags: document.getElementById('blogTags').value || '',
                content: document.getElementById('blogContent').value,
                image: document.getElementById('blogImage').value,
                publishDate: document.getElementById('publishDate').value,
                author: auth.currentUser ? auth.currentUser.email : 'Church Admin'
            };

            savePostToFirestore(postData);
        });
    }

    // --- 3. UI RENDERING ---
    let allPostsCache = [];
    let blogPDFViewer = null;
    let currentBlobUrl = null;

    function addNewPostToList(postData, postId) {
        if (!postsList) return;

        allPostsCache.push({ id: postId, ...postData });

        const newPost = document.createElement('div');
        newPost.className = 'blog-post';
        newPost.dataset.id = postId;

        const date = new Date(postData.publishDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        const statusClass = postData.status === 'published' ? 'status-published' : 'status-draft';
        const categoryDisplay = postData.category ?
            postData.category.charAt(0).toUpperCase() + postData.category.slice(1).replace('-', ' ') :
            'Uncategorized';

        // Excerpt logic
        const excerpt = postData.content ? postData.content.substring(0, 150) + '...' : 'No content';

        newPost.innerHTML = `
            <div class="post-header">
                <h4 class="post-title">${postData.title}</h4>
                <span class="post-status ${statusClass}">${postData.status}</span>
            </div>
            <div class="post-meta">
                <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                <span><i class="fas fa-folder"></i> ${categoryDisplay}</span>
                <span><i class="fas fa-user"></i> ${postData.author || 'Admin'}</span>
            </div>
            <p class="post-excerpt">${excerpt}</p>
            <div class="post-actions">
                <button class="post-action-btn view-btn" onclick="viewPostAsPDF('${postId}')">
                    <i class="fas fa-file-pdf"></i> Read Message as PDF
                </button>
                <button class="post-action-btn pdf-btn" onclick="exportPostToPDF('${postId}')" title="Download PDF">
                    <i class="fas fa-download"></i>
                </button>
                ${postData.isStatic ?
                `<button class="post-action-btn view-btn" onclick="viewPostAsPDF('${postId}')"><i class="fas fa-archive"></i> View in Archive</button>` :
                (auth.currentUser ? `<button class="post-action-btn delete-btn" onclick="deletePost('${postId}')"><i class="fas fa-trash"></i> Delete</button>` : '')
            }
            </div>
        `;

        postsList.appendChild(newPost);
    }

    // Admin PDF Preview
    const previewPdfBtn = document.getElementById('previewPdf');
    if (previewPdfBtn) {
        previewPdfBtn.addEventListener('click', function () {
            const draftData = {
                title: document.getElementById('blogTitle').value || 'Untitled Draft',
                category: document.getElementById('blogCategory').value || 'General',
                content: document.getElementById('blogContent').value || 'No content provided.',
                publishDate: document.getElementById('publishDate').value || new Date().toISOString().split('T')[0],
                author: auth.currentUser ? auth.currentUser.email : 'Church Admin'
            };

            // Use a temporary ID for preview
            const tempId = 'preview-' + Date.now();
            allPostsCache.push({ id: tempId, ...draftData });
            viewPostAsPDF(tempId);
        });
    }

    // Initialize the viewer immediately
    if (document.getElementById('pdf-viewer-container')) {
        blogPDFViewer = new PDFViewer('pdf-viewer-container', 'pdf-toolbar');
    }

    // Modal Closing Logic
    const pdfModal = document.getElementById('pdf-modal');
    const modalClose = document.getElementById('modal-close');
    if (modalClose && pdfModal) {
        modalClose.addEventListener('click', () => {
            pdfModal.style.display = 'none';
            if (blogPDFViewer) blogPDFViewer.clear();
            if (currentBlobUrl) {
                URL.revokeObjectURL(currentBlobUrl);
                currentBlobUrl = null;
            }
        });

        window.addEventListener('click', (e) => {
            if (e.target === pdfModal) {
                pdfModal.style.display = 'none';
                if (blogPDFViewer) blogPDFViewer.clear();
                if (currentBlobUrl) {
                    URL.revokeObjectURL(currentBlobUrl);
                    currentBlobUrl = null;
                }
            }
        });
    }

    // Inline PDF View Function
    window.viewPostAsPDF = function (postId) {
        const post = allPostsCache.find(p => p.id === postId);
        if (!post) {
            showToast('Error', 'Post content not found', 'error');
            return;
        }

        const date = new Date(post.publishDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        // Setup the modal first
        pdfModal.style.display = 'flex';
        document.getElementById('modal-title').textContent = post.title;

        // If the post has a direct PDF URL associated (static archive posts)
        if (post.pdfUrl) {
            showToast('Loading', 'Loading document from archive...', 'success');

            if (blogPDFViewer) {
                blogPDFViewer.loadPDF(post.pdfUrl);
            }

            // Setup download button in modal
            const downloadBtn = document.getElementById('downloadPdfBtn');
            if (downloadBtn) {
                downloadBtn.onclick = () => {
                    const a = document.createElement('a');
                    a.href = post.pdfUrl;
                    a.download = post.pdfUrl.split('/').pop() || `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                };
            }
            return; // Skip generation logic
        }

        // Generate PDF on the fly for regular blog posts
        // Create temporary template for conversion
        const element = document.createElement('div');
        element.style.padding = '40px';
        element.style.background = '#fff';
        element.style.fontFamily = "'Montserrat', sans-serif";
        element.style.color = '#1e293b';
        element.style.width = '800px'; // Standard A4-ish width for conversion

        element.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px;">
                <img src="images/minorah%20image.jpg" style="height: 80px; border-radius: 50%; margin-bottom: 15px;">
                <h1 style="color: #1a2b6d; margin: 0; font-family: 'Playfair Display', serif;">Kaloleni Seventh Day Church</h1>
                <p style="color: #d4af37; font-weight: 600; margin: 5px 0;">Growing in faith, serving with love</p>
            </div>
            <div style="margin-bottom: 20px;">
                <h2 style="font-size: 24px; color: #1a2b6d; margin-bottom: 10px;">${post.title}</h2>
                <div style="font-size: 14px; color: #64748b; margin-bottom: 20px;">
                    <span>Date: ${formattedDate}</span> | 
                    <span>Category: ${post.category || 'General'}</span> | 
                    <span>Author: ${post.author || 'Church Admin'}</span>
                </div>
            </div>
            <div style="line-height: 1.8; font-size: 16px; white-space: pre-wrap;">
                ${post.content}
            </div>
            <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
                &copy; 2026 Kaloleni Church of Elohim. All Rights Reserved.
            </div>
        `;

        showToast('Processing', 'Opening document...', 'success');

        const opt = {
            margin: [10, 10],
            filename: 'temp.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).output('blob').then(function (blob) {
            if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
            currentBlobUrl = URL.createObjectURL(blob);

            if (blogPDFViewer) {
                blogPDFViewer.loadPDF(currentBlobUrl);
            }

            // Setup download button in modal
            const downloadBtn = document.getElementById('downloadPdfBtn');
            if (downloadBtn) {
                downloadBtn.onclick = () => {
                    const a = document.createElement('a');
                    a.href = currentBlobUrl;
                    a.download = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                };
            }
        });
    };

    // PDF Export Function (Legacy / Quick Download)
    window.exportPostToPDF = function (postId) {
        const post = allPostsCache.find(p => p.id === postId);
        if (!post) return;

        // Use the same element creation logic or a simplified version
        viewPostAsPDF(postId); // Reuse the view logic but also trigger download if needed
    };

    // Global delete function
    window.deletePost = function (postId) {
        if (confirm('Are you sure you want to delete this post?')) {
            db.collection('blog_posts').doc(postId).delete()
                .then(() => showToast('Deleted', 'Post removed successfully', 'success'))
                .catch(err => showToast('Error', err.message, 'error'));
        }
    };

    // --- 4. EXTRAS ---
    // AI Assist (Static logic preserved)
    const aiAssistBtn = document.getElementById('aiAssist');
    if (aiAssistBtn) {
        aiAssistBtn.addEventListener('click', function () {
            const aiSuggestion = document.getElementById('aiSuggestion');
            aiSuggestion.classList.add('show');
            const suggestions = [
                "Consider adding a relevant Bible verse to strengthen your message.",
                "You could include a prayer at the end of your post for readers.",
                "Try sharing a personal testimony to make your message more relatable."
            ];
            document.getElementById('suggestionText').textContent = suggestions[Math.floor(Math.random() * suggestions.length)];
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.blog-post').forEach(post => {
                const text = post.textContent.toLowerCase();
                post.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }

    const publishDateInput = document.getElementById('publishDate');
    if (publishDateInput) {
        publishDateInput.value = new Date().toISOString().split('T')[0];
    }

    // Initialize fetching
    fetchPosts();
});
