/* ===== GLOBAL JAVASCRIPT ===== */
document.addEventListener('DOMContentLoaded', function () {
    // Scroll Reveal Logic
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 1. Mobile Menu Toggling
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            mobileMenuBtn.innerHTML = isActive
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // 2. Back to Top Logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. Newsletter Submission Link
    const newsletterForms = document.querySelectorAll('.newsletter-form, .cta-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const btn = form.querySelector('button[type="submit"]');
            const email = emailInput ? emailInput.value.trim() : '';

            if (email) {
                const originalText = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                try {
                    const primaryEmail = 'muriukic522@gmail.com';
                    const secondaryEmail = 'stephen49km@gmail.com';

                    const response = await fetch(`https://formsubmit.co/ajax/${primaryEmail}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                            _subject: 'Newsletter Subscription - Kaloleni Church',
                            _cc: secondaryEmail,
                            _template: 'table',
                            _captcha: 'false',
                            _autoresponse: `Shalom,\n\nBlessings for joining our newsletter. You will now receive weekly highlights, sermon updates, and ministry news from the Kaloleni Seventh day Church of Elohim.\n\n"The Lord bless thee, and keep thee." - Numbers 6:24\n\nIn His Service,\nKaloleni Church of Elohim`
                        })
                    });

                    if (response.ok) {
                        showGlobalNotification('Subscribed successfully!', 'success');
                        if (emailInput) emailInput.value = '';
                    } else {
                        throw new Error('Failed to subscribe');
                    }
                } catch (error) {
                    showGlobalNotification(error.message, 'error');
                } finally {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                }
            }
        });
    });

    // 4. Sticky Header Logic
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// Global Notification Helper
function showGlobalNotification(message, type = 'success') {
    let toast = document.getElementById('global-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-notification';
        toast.className = 'notification-toast';
        document.body.appendChild(toast);
    }

    toast.className = `notification-toast ${type} show`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> <span>${message}</span>`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
