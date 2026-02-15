// Authorized Admin Emails
const AUTHORIZED_ADMINS = [
    'muriukic522@gmail.com',
    'admin@kalolenichurch.org'
];

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
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Handle Login Implementation
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('adminEmail').value.trim();
            const password = document.getElementById('adminPassword').value;

            console.log("Attempting login for:", email);

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (AUTHORIZED_ADMINS.includes(user.email)) {
                        showToast('Welcome Admin', `Logged in as ${user.email}`, 'success');
                        loginModal.style.display = 'none';
                        adminLoginForm.reset();
                    } else {
                        // User is authenticated but NOT in our allowed admin list
                        auth.signOut();
                        showToast('Access Denied', 'Your account does not have admin privileges.', 'error');
                    }
                })
                .catch((error) => {
                    console.error("Login Details Error:", error);
                    let errorMessage = error.message;
                    if (error.code === 'auth/configuration-not-found') {
                        errorMessage = "CRITICAL: Email/Password login is NOT enabled in your Firebase Console. Please go to Authentication > Sign-in Method and enable it.";
                    } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                        errorMessage = "The email or password you entered is incorrect. If you haven't added the user yet, please go to the 'Users' tab in Firebase and click 'Add user'.";
                    }
                    showToast('Login Failed', errorMessage, 'error');
                });
        });
    }

    // Listen for Auth State Changes
    auth.onAuthStateChanged(user => {
        const adminFormContainer = document.getElementById('adminFormContainer');
        const adminActions = document.querySelectorAll('.post-actions');

        if (user && AUTHORIZED_ADMINS.includes(user.email)) {
            // Logged in as Admin
            authStatusText.textContent = 'Logout Admin';
            adminLoginBtn.classList.add('auth-logged-in');

            // Show Admin-only sections (Blog form, etc.)
            if (adminFormContainer) adminFormContainer.style.display = 'block';
            adminActions.forEach(el => el.style.display = 'flex');
        } else {
            // Not logged in or not an admin
            authStatusText.textContent = 'Admin Login';
            adminLoginBtn.classList.remove('auth-logged-in');

            // Hide Admin-only sections
            if (adminFormContainer) adminFormContainer.style.display = 'none';
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
