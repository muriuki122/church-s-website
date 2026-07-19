// ===== TRANSLATION SYSTEM =====
let currentLanguage = 'en';

const translations = {
    en: {
        // Site and Navigation
        siteTitle: "Church of Elohim, 7th day",
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
        toastLoading: "Loading Church of Elohim, 7th day"
    },

    sw: {
        // Site and Navigation
        siteTitle: "Kanisa la Church of Elohim, 7th day",
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
        toastLoading: "Inapakia Church of Elohim, 7th day"
    },

    rw: {
        // Site and Navigation
        siteTitle: "Itorero rya Church of Elohim, 7th day",
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
        toastLoading: "Gupakira Church of Elohim, 7th day"
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

        const languageButtons = document.querySelectorAll('.language-dropdown li');
        languageButtons.forEach(b => {
            if(b.getAttribute('data-lang') === currentLanguage) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
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
            localStorage.setItem('preferredLanguage', currentLanguage);
            updateLanguage();
        });
    }

    const languageButtons = document.querySelectorAll('.language-dropdown li');
    if (languageButtons.length > 0) {
        languageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentLanguage = e.target.getAttribute('data-lang');
                localStorage.setItem('preferredLanguage', currentLanguage);
                
                languageButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                updateLanguage();
            });
        });
    }
});

// ===== MOBILE NAVIGATION handled by global.js =====

// ===== YOUTUBE FUNCTIONALITY =====
let player;
const youtubeSearchInput = document.getElementById('youtube-search-input');
const youtubeSearchBtn = document.getElementById('youtube-search-btn');
const muteToggleBtn = document.getElementById('btn-mute-toggle');
const muteText = document.getElementById('mute-text');

const CHANNEL_ID = 'UCRlkkd6Koyi5biTO8W7eRaQ';
const UPLOADS_PLAYLIST_ID = 'UURlkkd6Koyi5biTO8W7eRaQ';

// YouTube IFrame API initialization
window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('yt-player', {
        width: '100%',
        height: '100%',
        playerVars: {
            listType: 'playlist',
            list: UPLOADS_PLAYLIST_ID,
            autoplay: 1,
            mute: 1,
            rel: 0,
            modestbranding: 1,
            origin: window.location.origin
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
    console.log('YouTube Player Ready');
    updateMuteUI();
}

function onPlayerStateChange(event) {
    // Keep UI in sync when user interacts with the player directly
    updateMuteUI();
}

// Volume Slider Logic
const volumeSlider = document.getElementById('volume-slider');

function updateMuteUI() {
    if (!player || typeof player.isMuted !== 'function') return;
    try {
        const isMuted = player.isMuted();
        const currentVolume = player.getVolume();

        const icon = muteToggleBtn.querySelector('i');
        if (isMuted || currentVolume === 0) {
            icon.className = 'fas fa-volume-mute';
            muteText.textContent = 'Unmute';
            if (volumeSlider) volumeSlider.value = 0;
        } else if (currentVolume < 50) {
            icon.className = 'fas fa-volume-down';
            muteText.textContent = 'Mute';
            if (volumeSlider) volumeSlider.value = currentVolume;
        } else {
            icon.className = 'fas fa-volume-up';
            muteText.textContent = 'Mute';
            if (volumeSlider) volumeSlider.value = currentVolume;
        }
    } catch (e) {
        console.warn('Could not update mute UI:', e);
    }
}

if (muteToggleBtn) {
    muteToggleBtn.addEventListener('click', () => {
        if (!player || typeof player.isMuted !== 'function') return;
        if (player.isMuted()) {
            player.unMute();
            if (player.getVolume() === 0) player.setVolume(50);
        } else {
            player.mute();
        }
        updateMuteUI();
    });
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        if (!player || typeof player.setVolume !== 'function') return;
        const vol = parseInt(e.target.value);
        player.setVolume(vol);
        if (vol > 0 && player.isMuted()) {
            player.unMute();
        } else if (vol === 0 && !player.isMuted()) {
            player.mute();
        }
        updateMuteUI();
    });
}

const sermonData = [
    {
        id: 'dQw4w9WgXcQ', // Sample IDs, replace with real church video IDs later
        title: "Faith in Uncertain Times",
        date: "April 25, 2026",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        category: "recent"
    },
    {
        id: 'L_jWHffIx5E',
        title: "The Power of Prayer",
        date: "April 18, 2026",
        thumbnailUrl: "https://img.youtube.com/vi/L_jWHffIx5E/mqdefault.jpg",
        category: "recent"
    },
    {
        id: '3JZ_D3ELwOQ',
        title: "Walking by the Spirit",
        date: "April 11, 2026",
        thumbnailUrl: "https://img.youtube.com/vi/3JZ_D3ELwOQ/mqdefault.jpg",
        category: "series"
    },
    {
        id: 'yPYZpwSpKmA',
        title: "Biblical Stewardship",
        date: "April 4, 2026",
        thumbnailUrl: "https://img.youtube.com/vi/yPYZpwSpKmA/mqdefault.jpg",
        category: "all"
    }
];

let currentSermonIndex = 0;

function createSermonCard(sermon) {
    return `
        <div class="sermon-card reveal-item" data-video-id="${sermon.id}">
            <div class="sermon-thumbnail" onclick="playSermon('${sermon.id}')">
                <img src="${sermon.thumbnailUrl}" alt="${sermon.title}">
                <div class="play-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="sermon-details">
                <div class="sermon-date">
                    <i class="far fa-calendar-alt"></i> ${sermon.date}
                </div>
                <h3>${sermon.title}</h3>
                <button class="btn btn-primary" style="width:100%" onclick="playSermon('${sermon.id}')">Watch Now</button>
            </div>
        </div>
    `;
}

window.playSermon = function (videoId) {
    if (player && typeof player.loadVideoById === 'function') {
        player.loadVideoById(videoId);
        document.querySelector('.stream-player').scrollIntoView({ behavior: 'smooth' });
        // update current index for cycling
        const idx = sermonData.findIndex(s => s.id === videoId);
        if (idx >= 0) currentSermonIndex = idx;
        showToast("Playing: " + videoId);
    }
};

function loadSermons(filter = 'all') {
    const grid = document.getElementById('sermons-grid');
    if (!grid) return;

    const filtered = sermonData.filter(s => filter === 'all' || s.category === filter);
    grid.innerHTML = filtered.map(createSermonCard).join('');

    // Trigger scroll reveal for new items
    checkScroll();
}

// Filter listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadSermons(btn.dataset.filter);
    });
});

if (youtubeSearchBtn && youtubeSearchInput) {
    youtubeSearchBtn.addEventListener('click', () => {
        const query = youtubeSearchInput.value.trim();
        const t = translations[currentLanguage];
        if (player && typeof player.cuePlaylist === 'function') {
            if (query) {
                // Load search results as a playlist
                const searchQuery = 'Church of Elohim, 7th day ' + query;
                player.cuePlaylist({ listType: 'search', list: searchQuery });
                player.playVideo();
                showToast(t.toastSearching + ' ' + query);
            } else {
                player.cuePlaylist({ listType: 'playlist', list: UPLOADS_PLAYLIST_ID });
                player.playVideo();
                showToast(t.toastShowingVideos);
            }
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
if (browseBtns.length > 0) {
    browseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const t = translations[currentLanguage];
            if (player && typeof player.cuePlaylist === 'function') {
                player.cuePlaylist({ listType: 'playlist', list: UPLOADS_PLAYLIST_ID });
                player.playVideo();
            }
            document.querySelector('.stream-player').scrollIntoView({ behavior: 'smooth' });
            showToast(t.toastLoading + ' ' + btn.textContent.trim() + '...');
        });
    });
}

// ===== TOAST NOTIFICATION handled by global.js =====
function showToast(message, duration = 3000) {
    showGlobalNotification(message, 'success');
}

// ===== BUTTON FUNCTIONALITY =====
// ===== NOTIFY ME INLINE FORM =====
const notifyToggleBtn = document.getElementById('btn-notify-toggle');
const notifyFormInline = document.getElementById('notify-form-inline');
const notifySubmitBtn = document.getElementById('btn-submit-notify');
const notifyContactInput = document.getElementById('notify-contact');

if (notifyToggleBtn && notifyFormInline) {
    notifyToggleBtn.addEventListener('click', () => {
        notifyToggleBtn.style.display = 'none';
        notifyFormInline.style.display = 'flex';
        notifyContactInput.focus();
    });
}

if (notifySubmitBtn) {
    notifySubmitBtn.addEventListener('click', async () => {
        const contact = notifyContactInput.value.trim();
        const duration = document.getElementById('notify-duration').value;
        const churchPhone = "+254721218834";
        const churchEmail = "jcommunityofelohim@gmail.com";

        if (!contact) {
            showToast("Please enter an email or WhatsApp number", "error");
            return;
        }

        const isEmail = contact.includes('@');
        const isPhone = /^\+?[\d\s-]{8,}$/.test(contact);

        const originalText = notifySubmitBtn.innerHTML;
        notifySubmitBtn.disabled = true;
        notifySubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        try {
            const endpoints = [
                'stephen49km@gmail.com',
                'muriukic522@gmail.com'
            ];

            const sendPromises = endpoints.map(targetEmail =>
                fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        contact: contact,
                        duration: duration,
                        _subject: 'Live Stream Notification Request - Church of Elohim, 7th day',
                        _template: 'table',
                        _captcha: 'false'
                    })
                })
            );

            const results = await Promise.all(sendPromises);

            if (results.some(res => res.ok)) {
                showToast("Notification request recorded!");
                // Reset to button state
                notifyFormInline.style.display = 'none';
                notifyToggleBtn.style.display = 'inline-block';
                notifyToggleBtn.innerHTML = '<i class="fas fa-check"></i> Requested';
                notifyToggleBtn.style.backgroundColor = '#10b981';
                notifyToggleBtn.style.color = '#ffffff';
            } else {
                throw new Error('Failed to send request');
            }
        } catch (error) {
            showToast("Error recording request. Please try again.", "error");
            notifySubmitBtn.disabled = false;
            notifySubmitBtn.innerHTML = originalText;
        }
    });
}

// Check Live Button
const checkLiveBtn = document.getElementById('btn-check-live');
if (checkLiveBtn) {
    checkLiveBtn.addEventListener('click', () => {
        const t = translations[currentLanguage];
        const originalContent = checkLiveBtn.innerHTML;
        checkLiveBtn.innerHTML = '<i class="fas fa-sync fa-spin"></i> ' + t.checkLiveBtn;
        // Determine whether it's live time locally, otherwise cycle to next sermon
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const timeInDecimal = hour + (minute / 60);

        if ((day === 5 && timeInDecimal >= 18.5) || (day === 6 && timeInDecimal >= 9 && timeInDecimal < 16)) {
            // If it's live time, switch to live stream
            if (player && typeof player.loadVideoByUrl === 'function') {
                player.loadVideoByUrl(`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`);
            }
        } else {
            // Not live - cycle to the next sermon in the list
            const nextIndex = (currentSermonIndex + 1) % sermonData.length;
            const next = sermonData[nextIndex];
            if (next) {
                playSermon(next.id);
            }
        }

        // Update status and restore button
        updateStreamStatus();
        setTimeout(() => {
            checkLiveBtn.innerHTML = originalContent;
            showToast(t.toastChecked);
        }, 900);
    });
}

// YouTube Subscribe Button
const subscribeBtn = document.getElementById('btn-subscribe-live');
if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
        const t = translations[currentLanguage];
        // Open the channel in a new tab so the user can subscribe on YouTube
        const channelUrl = 'https://youtube.com/@churchofelohimkaloleni';
        window.open(channelUrl, '_blank');
        subscribeBtn.innerHTML = '<i class="fas fa-check"></i> ' + t.subscribeBtn;
        subscribeBtn.style.opacity = '0.9';
        showToast(t.toastSubscribed);
        subscribeBtn.disabled = true;
    });
}

// ===== FORM SUBMISSION handled by global.js =====

// ===== LIVE STREAM STATUS =====
function updateStreamStatus() {
    const liveBadge = document.querySelector('.live-badge');
    const streamStatus = document.querySelector('.stream-status h3');
    const sermonTitle = document.querySelector('.sermon-title');
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

            // Switch to live stream via the API
            if (player && typeof player.loadVideoByUrl === 'function') {
                try {
                    const currentUrl = player.getVideoUrl ? player.getVideoUrl() : '';
                    if (!currentUrl.includes('live')) {
                        player.loadVideoByUrl(`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`);
                    }
                } catch (e) { /* player not ready yet */ }
            }
        } else {
            liveBadge.innerHTML = '<i class="fas fa-circle"></i> OFFLINE';
            liveBadge.style.background = 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
            if (streamStatus) streamStatus.textContent = 'Service Not Currently Live';
            if (sermonTitle) sermonTitle.textContent = 'Browse our songs and activities below or visit our archives';
        }
    }
}

// Update stream status on page load
document.addEventListener('DOMContentLoaded', () => {
    updateStreamStatus();
    loadSermons();
});

// Update stream status every minute
setInterval(updateStreamStatus, 60000);

// ===== SCROLL ANIMATION (REFINED) =====
function checkScroll() {
    const elements = document.querySelectorAll('.event-card, .stream-info, .cta-box, .section-header, .sermon-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 50) {
            element.classList.add('active');
        }
    });
}

// Initialize elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.event-card, .stream-info, .cta-box, .section-header');
    animatedElements.forEach(element => {
        element.classList.add('reveal-item');
    });

    checkScroll();
});

window.addEventListener('scroll', checkScroll);

// Floating Back to Top
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});