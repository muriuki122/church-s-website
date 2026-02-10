// ===== TRANSLATION SYSTEM =====
let currentLanguage = 'en';

const translations = {
    en: {
        // Site and Navigation
        siteTitle: "Kaloleni Church",
        navHome: "Home",
        navWatchOnline: "Watch online",
        navAboutUs: "About us",
        navArchives: "Archives",
        navContact: "Contact",

        // Hero Section
        heroTitle: "Experience Elohim's Presence",
        heroSubtitle: "Join our live worship services online or in person",
        watchLiveBtn: "Watch Live",

        // Live Worship Section
        liveWorshipTitle: "Live Worship",
        liveWorshipSubtitle: "Join us for today's service",
        liveNow: "LIVE NOW",
        saturdayService: "Saturday Service",
        sermonText: "\"MITHALI 4:23\" (linda moyo wako kuliko yote uyalindayo; maana ndiko zitokako chemchemi za uzima.)",

        // Stream Meta
        allServices: "All services",
        serviceTimes: "Fri 6:30 PM | Sat 9:00 AM - 4:00 PM",
        speaker: "Elder or Member",

        // Buttons
        subscribeBtn: "Subscribe",
        checkLiveBtn: "Check Live",
        notifyMeBtn: "Notify Me",

        // CTA Section
        ctaTitle: "Never Miss a Service",
        ctaSubtitle: "Get notified when we go live and receive weekly sermon updates",
        emailPlaceholder: "Your email address",
        subscribeFormBtn: "Subscribe",

        // Events Section
        upcomingEventsTitle: "Upcoming Events",

        // Shabbat Event
        shabbatTitle: "Shabbat (The Sabbath)",
        shabbatTime: "Sunset Friday to nightfall Saturday.",
        shabbatDesc: "Rest, spiritual renewal, and remembrance of Creation/Exodus.",
        shabbatHours: "9:00 AM - 4:00 PM",
        churchSanctuary: "Church Sanctuary",

        // Pesach Event
        pesachTitle: "Pesach (Passover)",
        pesachTime: "15–21 Nissan (Spring).",
        pesachDesc: "Eating only unleavened bread (matzah)",
        pesachDuration: "7 days.",
        pesachLocation: "Takes 7 days",

        // Shavuot Event
        shavuotTitle: "Shavuot (Weeks)",
        shavuotTime: "6 Sivan (50 days after Passover).",
        shavuotDesc: "All-night Torah study (Tikkun Leil Shavuot).",
        shavuotTheme: "Theme: Receiving the Torah at Mount Sinai.",
        shavuotLocation: "Naivasha",

        moreDetails: "More Details",
        viewAllEvents: "View All Events",

        // Footer
        quickLinks: "Quick Links",
        contactUs: "Contact Us",

        // Toast Messages
        toastSubscribed: "Thank you for subscribing to our YouTube updates!",
        toastNotified: "You will be notified for the next live service!",
        toastChecked: "Checked for live stream status.",
        toastSubscriptionSuccess: "Successfully subscribed:",
        toastSearching: "Searching for:",
        toastShowingVideos: "Showing all church videos",
        toastLoading: "Loading Kaloleni"
    },

    sw: {
        // Site and Navigation
        siteTitle: "Kanisa la Kaloleni",
        navHome: "Nyumbani",
        navWatchOnline: "Tazama mtandaoni",
        navAboutUs: "Kuhusu sisi",
        navArchives: "Kumbukumbu",
        navContact: "Wasiliana",

        // Hero Section
        heroTitle: "Pata Uwepo wa Elohim",
        heroSubtitle: "Jiunge na ibada yetu ya moja kwa moja mtandaoni au kwa uso kwa uso",
        watchLiveBtn: "Tazama Moja kwa Moja",

        // Live Worship Section
        liveWorshipTitle: "Ibada ya Moja kwa Moja",
        liveWorshipSubtitle: "Jiunge nasi kwa huduma ya leo",
        liveNow: "MOJA KWA MOJA SASA",
        saturdayService: "Huduma ya Jumamosi",
        sermonText: "\"MITHALI 4:23\" (linda moyo wako kuliko yote uyalindayo; maana ndiko zitokako chemchemi za uzima.)",

        // Stream Meta
        allServices: "Huduma zote",
        serviceTimes: "Ijumaa 6:30 PM | Jumamosi 9:00 AM - 4:00 PM",
        speaker: "Mzee au Mwanachama",

        // Buttons
        subscribeBtn: "Jiandikishe",
        checkLiveBtn: "Angalia Moja kwa Moja",
        notifyMeBtn: "Nijulishe",

        // CTA Section
        ctaTitle: "Usikose Huduma Yoyote",
        ctaSubtitle: "Pata taarifa tunapokuwa moja kwa moja na upokee masasisho ya kila wiki ya mahubiri",
        emailPlaceholder: "Anwani yako ya barua pepe",
        subscribeFormBtn: "Jiandikishe",

        // Events Section
        upcomingEventsTitle: "Matukio Yajayo",

        // Shabbat Event
        shabbatTitle: "Sabato (Siku ya Pumziko)",
        shabbatTime: "Machweo ya Ijumaa hadi usiku wa Jumamosi.",
        shabbatDesc: "Pumziko, kujifurahisha kiroho, na kukumbuka Uumbaji/Kutoka.",
        shabbatHours: "9:00 AM - 4:00 PM",
        churchSanctuary: "Mahali Patakatifu pa Kanisa",

        // Pesach Event
        pesachTitle: "Pesaki (Pasaka)",
        pesachTime: "15–21 Nisani (Majira ya Kuchipua).",
        pesachDesc: "Kula mkate usio na chachu tu (matsa)",
        pesachDuration: "Siku 7.",
        pesachLocation: "Inachukua siku 7",

        // Shavuot Event
        shavuotTitle: "Shavuoti (Wiki)",
        shavuotTime: "6 Sivani (siku 50 baada ya Pasaka).",
        shavuotDesc: "Kusoma Torah usiku kucha (Tikuni Leili Shavuoti).",
        shavuotTheme: "Mada: Kupokea Torah katika Mlima Sinai.",
        shavuotLocation: "Naivasha",

        moreDetails: "Maelezo Zaidi",
        viewAllEvents: "Tazama Matukio Yote",

        // Footer
        quickLinks: "Viungo vya Haraka",
        contactUs: "Wasiliana Nasi",

        // Toast Messages
        toastSubscribed: "Asante kwa kujiandikisha kwa masasisho yetu ya YouTube!",
        toastNotified: "Utajulishwa kwa huduma inayofuata ya moja kwa moja!",
        toastChecked: "Imeangaliwa hali ya mtiririko wa moja kwa moja.",
        toastSubscriptionSuccess: "Umejiandikisha kwa mafanikio:",
        toastSearching: "Kutafuta:",
        toastShowingVideos: "Kuonyesha video zote za kanisa",
        toastLoading: "Inapakia Kaloleni"
    },

    rw: {
        // Site and Navigation
        siteTitle: "Itorero rya Kaloleni",
        navHome: "Ahabanza",
        navWatchOnline: "Reba kuri interineti",
        navAboutUs: "Twebwe",
        navArchives: "Ububiko",
        navContact: "Twandikire",

        // Hero Section
        heroTitle: "Hura Ubwitonzi bwa Elohim",
        heroSubtitle: "Twinjire mu isengesho ryacu ritaziguye kuri interineti cyangwa mu muntu",
        watchLiveBtn: "Reba Ritaziguye",

        // Live Worship Section
        liveWorshipTitle: "Isengesho Ritaziguye",
        liveWorshipSubtitle: "Twinjire muri serivisi y'uyu munsi",
        liveNow: "RITAZIGUYE UBUNONONEZO",
        saturdayService: "Serivisi ya Ku wa Gatandatu",
        sermonText: "\"IMIGANI 4:23\" (rinda umutima wawe kuruta ibindi byose urinda; kuko niho bituruka isoko y'ubuzima.)",

        // Stream Meta
        allServices: "Serivisi zose",
        serviceTimes: "Ku wa Gatanu 6:30 PM | Ku wa Gatandatu 9:00 AM - 4:00 PM",
        speaker: "Umukuru cyangwa Umunyamuryango",

        // Buttons
        subscribeBtn: "Iyandikishe",
        checkLiveBtn: "Reba Ritaziguye",
        notifyMeBtn: "Mpa Amakuru",

        // CTA Section
        ctaTitle: "Ntutakaze Serivisi",
        ctaSubtitle: "Habwe amakuru iyo tugiye kuba ritaziguye kandi uhabwe amakuru ya buri cyumweru y'ibibazo",
        emailPlaceholder: "Aderesi yawe ya imeri",
        subscribeFormBtn: "Iyandikishe",

        // Events Section
        upcomingEventsTitle: "Ibyabaye Bizaza",

        // Shabbat Event
        shabbatTitle: "Sabato (Umunsi wo Kuruhuka)",
        shabbatTime: "Kuva ku mugoroba w'iku wa Gatanu kugeza nijoro rya Ku wa Gatandatu.",
        shabbatDesc: "Kuruhuka, kuvugurura mu mwuka, no kwibuka Isezerano/Kuva muri Egiputa.",
        shabbatHours: "9:00 AM - 4:00 PM",
        churchSanctuary: "Icyumba Cyera cy'Itorero",

        // Pesach Event
        pesachTitle: "Pesaki (Pasika)",
        pesachTime: "15–21 Nisani (Impeshyi).",
        pesachDesc: "Kurya umugati utarimo ikimera gusa (matsa)",
        pesachDuration: "Iminsi 7.",
        pesachLocation: "Bifata iminsi 7",

        // Shavuot Event
        shavuotTitle: "Shavuoti (Ibyumweru)",
        shavuotTime: "6 Sivani (iminsi 50 nyuma ya Pasika).",
        shavuotDesc: "Kwiga Torah ijoro ryose (Tikuni Leili Shavuoti).",
        shavuotTheme: "Insanganyamatsiko: Kwakira Amategeko kuri Musine.",
        shavuotLocation: "Naivasha",

        moreDetails: "Ibisobanuro Byinshi",
        viewAllEvents: "Reba Ibyabaye Byose",

        // Footer
        quickLinks: "Ihuza Byihuse",
        contactUs: "Twandikire",

        // Toast Messages
        toastSubscribed: "Murakoze kwiyandikisha kuri YouTube yacu!",
        toastNotified: "Uzamenyeshwa serivisi ikurikira itaziguye!",
        toastChecked: "Byagenzuwe imiterere y'umuyoboro utaziguye.",
        toastSubscriptionSuccess: "Wiyandikishije neza:",
        toastSearching: "Gushakisha:",
        toastShowingVideos: "Kwerekana amashusho yose y'itorero",
        toastLoading: "Gupakira Kaloleni"
    }
};

// Update all translatable elements
function updateLanguage() {
    const t = translations[currentLanguage];

    // Update all elements with data-key attribute
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-key-placeholder]').forEach(el => {
        const key = el.getAttribute('data-key-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    // Update document title
    document.title = `${t.siteTitle} - ${t.navWatchOnline}`;

    // Save language preference
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['en', 'sw', 'rw'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = currentLanguage;
        }
    }
}

// Language selector event listener
document.addEventListener('DOMContentLoaded', () => {
    loadLanguagePreference();
    updateLanguage();

    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            updateLanguage();
        });
    }
});

// ===== MOBILE NAVIGATION =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');

        mobileMenuBtn.innerHTML = isActive
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav.main-nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// ===== YOUTUBE FUNCTIONALITY =====
const youtubeSearchInput = document.getElementById('youtube-search-input');
const youtubeSearchBtn = document.getElementById('youtube-search-btn');
const videoPlayerFrame = document.querySelector('.stream-player iframe');

const CHANNEL_ID = 'UCRlkkd6Koyi5biTO8W7eRaQ';
const UPLOADS_PLAYLIST_ID = 'UURlkkd6Koyi5biTO8W7eRaQ';

if (youtubeSearchBtn && youtubeSearchInput && videoPlayerFrame) {
    youtubeSearchBtn.addEventListener('click', () => {
        const query = youtubeSearchInput.value.trim();
        const t = translations[currentLanguage];
        if (query) {
            const searchQuery = encodeURIComponent('Kaloleni Church ' + query);
            videoPlayerFrame.src = `https://www.youtube.com/embed?listType=search&list=${searchQuery}&autoplay=1`;
            showToast(t.toastSearching + ' ' + query);
        } else {
            videoPlayerFrame.src = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&autoplay=1`;
            showToast(t.toastShowingVideos);
        }
    });

    youtubeSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            youtubeSearchBtn.click();
        }
    });
}

// Quick Browse Functionality
const browseBtns = document.querySelectorAll('.btn-browse');
if (browseBtns.length > 0 && videoPlayerFrame) {
    browseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const t = translations[currentLanguage];
            videoPlayerFrame.src = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&autoplay=1`;
            document.querySelector('.stream-player').scrollIntoView({ behavior: 'smooth' });
            showToast(t.toastLoading + ' ' + btn.textContent.trim() + '...');
        });
    });
}

// ===== TOAST NOTIFICATION =====
function showToast(message, duration = 3000) {
    const toast = document.getElementById('notification-success');
    const toastMessage = document.getElementById('notification-message');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
}

// ===== BUTTON FUNCTIONALITY =====
// Notify Me Button
const notifyBtn = document.getElementById('btn-notify-me');
if (notifyBtn) {
    notifyBtn.addEventListener('click', () => {
        const t = translations[currentLanguage];
        notifyBtn.innerHTML = '<i class="fas fa-check"></i> ' + t.notifyMeBtn;
        notifyBtn.style.backgroundColor = '#d4af37';
        notifyBtn.style.color = '#1a2b6d';
        showToast(t.toastNotified);
        notifyBtn.disabled = true;
        notifyBtn.style.cursor = 'default';
        notifyBtn.style.opacity = '0.8';
    });
}

// Check Live Button
const checkLiveBtn = document.getElementById('btn-check-live');
if (checkLiveBtn) {
    checkLiveBtn.addEventListener('click', () => {
        const t = translations[currentLanguage];
        const originalContent = checkLiveBtn.innerHTML;
        checkLiveBtn.innerHTML = '<i class="fas fa-sync fa-spin"></i> ' + t.checkLiveBtn;

        updateStreamStatus();

        setTimeout(() => {
            checkLiveBtn.innerHTML = originalContent;
            showToast(t.toastChecked);
        }, 1500);
    });
}

// YouTube Subscribe Button
const subscribeBtn = document.getElementById('btn-subscribe-live');
if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
        const t = translations[currentLanguage];
        subscribeBtn.innerHTML = '<i class="fas fa-check"></i> ' + t.subscribeBtn;
        subscribeBtn.style.opacity = '0.8';
        showToast(t.toastSubscribed);
        subscribeBtn.disabled = true;
    });
}

// ===== FORM SUBMISSION =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const t = translations[currentLanguage];
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (emailInput && emailInput.value) {
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                showToast(`${t.toastSubscriptionSuccess} ${emailInput.value}`);
                emailInput.value = '';
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }, 1000);
        }
    });
});

// ===== LIVE STREAM STATUS =====
function updateStreamStatus() {
    const liveBadge = document.querySelector('.live-badge');
    const streamStatus = document.querySelector('.stream-status h3');
    const sermonTitle = document.querySelector('.sermon-title');
    const videoPlayerFrame = document.querySelector('.stream-player iframe');
    const t = translations[currentLanguage];

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeInDecimal = hour + (minute / 60);

    let isLiveTime = false;
    let serviceName = '';
    let serviceStatusText = '';

    if (day === 5 && timeInDecimal >= 18.5) {
        isLiveTime = true;
        serviceName = t.saturdayService.replace('Saturday', 'Friday Evening');
        serviceStatusText = t.liveWorshipSubtitle;
    } else if (day === 6 && timeInDecimal >= 9 && timeInDecimal < 16) {
        isLiveTime = true;
        serviceName = t.saturdayService;
        serviceStatusText = t.sermonText;
    }

    if (liveBadge) {
        if (isLiveTime) {
            liveBadge.innerHTML = `<i class="fas fa-circle"></i> ${t.liveNow}`;
            liveBadge.style.background = 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)';
            if (streamStatus) streamStatus.textContent = serviceName;
            if (sermonTitle) sermonTitle.textContent = serviceStatusText;

            const liveEmbedUrl = `https://www.youtube.com/embed/live?channel=${CHANNEL_ID}&autoplay=1&mute=1`;

            if (videoPlayerFrame && !videoPlayerFrame.src.includes('embed/live')) {
                videoPlayerFrame.src = liveEmbedUrl;
            }
        } else {
            liveBadge.innerHTML = '<i class="fas fa-circle"></i> OFFLINE';
            liveBadge.style.background = 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
            if (streamStatus) streamStatus.textContent = 'Service Not Currently Live';
            if (sermonTitle) sermonTitle.textContent = 'Browse our songs and activities below or visit our archives';

            if (videoPlayerFrame && videoPlayerFrame.src.includes('embed/live')) {
                videoPlayerFrame.src = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&autoplay=0`;
            }
        }
    }
}

// Update stream status on page load
document.addEventListener('DOMContentLoaded', updateStreamStatus);

// Update stream status every minute
setInterval(updateStreamStatus, 60000);

// ===== SCROLL ANIMATION =====
function checkScroll() {
    const elements = document.querySelectorAll('.event-card, .stream-info, .cta-box');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.event-card, .stream-info, .cta-box');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    checkScroll();
});

window.addEventListener('scroll', checkScroll);