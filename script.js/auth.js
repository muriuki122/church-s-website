// Authorized Admin Emails (Baseline)
const AUTHORIZED_ADMINS = [
    'muriukic522@gmail.com',
    'admin@kalolenichurch.org'
];

// Global Auth State
window.auth = {
    currentUser: JSON.parse(localStorage.getItem('church_admin')) || null,
    onAuthStateChanged: function(callback) {
        // Simple observer pattern
        this._callback = callback;
        callback(this.currentUser);
    },
    signIn: async function(email, password) {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                this.currentUser = data.user;
                localStorage.setItem('church_admin', JSON.stringify(data.user));
                if (this._callback) this._callback(this.currentUser);
                return { success: true };
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (err) {
            return { success: false, message: err.message };
        }
    },
    signOut: async function() {
        this.currentUser = null;
        localStorage.removeItem('church_admin');
        if (this._callback) this._callback(null);
        return Promise.resolve();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const loginModal = document.getElementById('loginModal');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const closeBtns = document.querySelectorAll('.modal-close');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const authStatusText = document.getElementById('authStatusText');

    // Toggle Modal
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', () => {
            if (auth.currentUser) {
                // If already logged in, logout on click
                auth.signOut().then(() => {
                    showToast('Logged Out', 'You have been logged out successfully.', 'success');
                });
            } else {
                loginModal.style.display = 'flex';
            }
        });
    }

    // Close Modal
    if (closeBtns) {
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                loginModal.style.display = 'none';
            });
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Handle Login Implementation
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('adminEmail').value.trim();
            const password = document.getElementById('adminPassword').value;

            const result = await auth.signIn(email, password);
            if (result.success) {
                showToast('Welcome Admin', `Logged in successfully`, 'success');
                loginModal.style.display = 'none';
                adminLoginForm.reset();
            } else {
                showToast('Login Failed', result.message, 'error');
            }
        });
    }

    // Listen for Auth State Changes
    auth.onAuthStateChanged(user => {
        const adminFormContainer = document.getElementById('adminFormContainer');
        const adminActions = document.querySelectorAll('.post-actions');
        const blogAdminSection = document.querySelector('.admin-section');

        if (user) {
            // Logged in as Admin
            if (authStatusText) authStatusText.textContent = 'Logout Admin';
            if (adminLoginBtn) adminLoginBtn.classList.add('auth-logged-in');

            // Show Admin-only sections 
            if (adminFormContainer) {
                adminFormContainer.style.display = 'flex';
                const tabBlogBtn = document.getElementById('tabBlogBtn');
                if (tabBlogBtn) tabBlogBtn.click();
            }

            if (blogAdminSection) {
                blogAdminSection.style.display = 'block';
                blogAdminSection.scrollIntoView({ behavior: 'smooth' });
            }

            adminActions.forEach(el => el.style.display = 'flex');
        } else {
            // Not logged in
            if (authStatusText) authStatusText.textContent = 'Admin Login';
            if (adminLoginBtn) adminLoginBtn.classList.remove('auth-logged-in');

            if (adminFormContainer) adminFormContainer.style.display = 'none';
            if (blogAdminSection) blogAdminSection.style.display = 'none';
            adminActions.forEach(el => el.style.display = 'none');
        }
    });
});

// Toast Helper (Shared if not already present)
function showToast(title, message, type) {
    // Check if toast element exists, if not create one
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-info-circle"></i></div>
            <div class="toast-message">
                <div class="toast-title"></div>
                <div class="toast-text"></div>
            </div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        document.body.appendChild(toast);

        toast.querySelector('.toast-close').onclick = () => toast.classList.remove('show');
    }

    const toastTitle = toast.querySelector('.toast-title');
    const toastText = toast.querySelector('.toast-text');
    const toastIcon = toast.querySelector('.toast-icon i');

    toastTitle.textContent = title;
    toastText.textContent = message;

    toast.className = 'toast show';
    if (type === 'success') {
        toast.classList.add('toast-success');
        toastIcon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        toast.classList.add('toast-error');
        toastIcon.className = 'fas fa-exclamation-circle';
    }

    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}
