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
            isStatic: true
        },
        {
            id: 'static-2',
            title: "The Legacy of 'A History of the True Church'",
            category: "news",
            author: "Church Media",
            publishDate: "2026-02-14",
            content: "Dive into the resilience of faith with Dugger and Dodd's monumental work. This history book traces the journey of the faithful through the centuries. Available now for full preview in our digital library.",
            status: 'published',
            isStatic: true
        },
        {
            id: 'static-3',
            title: "Study Guide: The Bible Home Instructor",
            category: "sermon",
            author: "Church Media",
            publishDate: "2026-02-13",
            content: "Looking for family study material? 'The Bible Home Instructor' offers practical biblical guidance for every household. Discover this treasure in our Archives today.",
            status: 'published',
            isStatic: true
        },
        {
            id: 'static-4',
            title: "Historical Research: The Two Babylons",
            category: "devotional",
            author: "Church Media",
            publishDate: "2026-02-12",
            content: "Alexander Hislop's classic research is a cornerstone of our historical collection. We've made it easier than ever to access this research directly through our mobile-optimized archive viewer.",
            status: 'published',
            isStatic: true
        }
    ];

    // --- 2. FIRESTORE SYNC ---
    function fetchPosts() {
        if (!db) {
            // If no DB, just show static posts
            postsList.innerHTML = '';
            staticPosts.forEach(post => addNewPostToList(post, post.id));
            return;
        }

        db.collection('blog_posts').orderBy('publishDate', 'desc')
            .onSnapshot((querySnapshot) => {
                postsList.innerHTML = '';

                // Add dynamic posts from Firestore
                const dynamicPosts = [];
                querySnapshot.forEach((doc) => {
                    dynamicPosts.push({ id: doc.id, ...doc.data() });
                });

                // Combine and sort (static posts act as baseline)
                const allPosts = [...dynamicPosts, ...staticPosts].sort((a, b) =>
                    new Date(b.publishDate) - new Date(a.publishDate)
                );

                if (allPosts.length === 0) {
                    postsList.innerHTML = '<p class="text-center">No posts yet.</p>';
                    return;
                }

                allPosts.forEach((post) => {
                    addNewPostToList(post, post.id);
                });
            }, (error) => {
                console.error("Error fetching posts: ", error);
                // Fallback to static if error
                postsList.innerHTML = '';
                staticPosts.forEach(post => addNewPostToList(post, post.id));
            });
    }

    // Save post to Firestore
    function savePostToFirestore(postData) {
        if (!db) {
            showToast('Error', 'Database not initialized', 'error');
            return;
        }

        db.collection('blog_posts').add(postData)
            .then(() => {
                showToast('Post Published', 'Your blog post has been shared with the community.', 'success');
                blogForm.reset();
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('publishDate').value = today;
            })
            .catch((error) => {
                showToast('Error', error.message, 'error');
            });
    }

    // --- 2. FORM HANDLING ---
    const blogForm = document.getElementById('blogForm');
    if (blogForm) {
        blogForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const postData = {
                title: document.getElementById('blogTitle').value,
                category: document.getElementById('blogCategory').value,
                tags: document.getElementById('blogTags').value,
                content: document.getElementById('blogContent').value,
                image: document.getElementById('blogImage').value,
                publishDate: document.getElementById('publishDate').value,
                status: 'published',
                author: auth.currentUser ? auth.currentUser.email : 'Anonymous',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            savePostToFirestore(postData);
        });
    }

    // --- 3. UI RENDERING ---
    function addNewPostToList(postData, postId) {
        if (!postsList) return;

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
                ${postData.isStatic ?
                `<a href="archives.html" class="post-action-btn view-btn"><i class="fas fa-archive"></i> View in Archive</a>` :
                (auth.currentUser ? `<button class="post-action-btn delete-btn" onclick="deletePost('${postId}')"><i class="fas fa-trash"></i> Delete</button>` : '')
            }
            </div>
        `;

        postsList.appendChild(newPost);
    }

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
