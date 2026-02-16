// ===== TRANSLATION SYSTEM =====
let currentLanguage = 'en';

const translations = {
    en: {
        // Site Title
        siteTitle: "Kaloleni Seventh day Church of Elohim",
        ofElohim: "Of Elohim",

        // Navigation
        navHome: "Home",
        navWatchOnline: "Watch online",
        navAboutUs: "About us",
        navArchives: "Archives",
        navContact: "Contact",

        // Hero Section
        heroTitle: "About Kaloleni Seventh day Church of Elohim",
        heroSubtitle: "Learn about our community, worship schedule, and traditions",
        scrollDown: "Scroll Down",

        // History Section
        ourStory: "Our Story",
        theBeginning: "The Beginning",
        beginningText: "Kaloleni Church was established with a vision to create a vibrant community of believers dedicated to serving God and spreading His message of love and salvation.",
        growthExpansion: "Growth & Expansion",
        growthText: "Over the years, we have grown into a diverse congregation that welcomes people from all walks of life, united in our faith and commitment to Christian values.",
        digitalMinistry: "Digital Ministry",
        digitalText: "Our church is built on the foundation of prayer, worship, and service, following the example set by Jesus Christ. We expanded our reach through online services.",

        // Stats
        members: "Members",
        years: "Years",
        ministries: "Ministries",

        // Service Schedule
        serviceScheduleTitle: "Our Service Schedule",
        serviceScheduleSubtitle: "Join us for our weekly worship services and fellowship",
        saturdayService: "Saturday Service",
        fridayService: "Friday Service",
        weeklyActivities: "Weekly Activities",

        // Saturday Schedule
        prayerOpening: "Prayer & Opening",
        prayerOpeningDesc: "We begin our service with communal prayer and worship songs to prepare our hearts for God's message.",
        morningSermon: "Morning Sermon",
        morningSermonDesc: "A brief but powerful sermon to inspire and guide us through the week ahead.",
        bibleStudy: "Bible Study",
        bibleStudyDesc: "An in-depth Bible lesson where we explore scripture and discuss how to apply it in our daily lives.",
        teaBreak: "Tea Break",
        teaBreakDesc: "A time for fellowship and refreshments as we connect with one another.",
        groupPresentations: "Group Presentations",
        groupPresentationsDesc: "Special presentations by our various groups and welcoming of visitors.",
        lunch: "Lunch",
        lunchDesc: "We share a meal together, strengthening our bonds as a church family.",
        afternoonSession: "Afternoon Session",
        afternoonSessionDesc: "Individual songs and choir presentations, followed by a closing sermon before we depart.",

        // Friday Schedule
        eveningWorship: "Evening Worship",
        eveningWorshipDesc: "We gather for an evening of prayer, worship, and reflection to end the week.",
        bibleStudyFriday: "Bible Study",
        bibleStudyFridayDesc: "An interactive Bible study session focusing on practical Christian living.",
        fellowship: "Fellowship",
        fellowshipDesc: "Time for sharing testimonies and building relationships within the church community.",

        // Weekly Activities
        prayerMeetings: "Prayer Meetings",
        prayerMeetingsTime: "Wednesday | 7:00 PM",
        prayerMeetingsDesc: "Join us for corporate prayer and intercession.",
        choirPractice: "Choir Practice",
        choirPracticeTime: "Thursday | 6:00 PM",
        choirPracticeDesc: "Our choir prepares for Sunday worship services.",
        youthFellowship: "Youth Fellowship",
        youthFellowshipTime: "Friday | 5:00 PM",
        youthFellowshipDesc: "Young people gathering for Bible study and activities.",

        // Music Ministry
        musicMinistryTitle: "Our Music Ministry",
        musicMinistrySubtitle: "Experience the power of worship through our diverse music groups",
        choir: "Choir",
        choirDesc: "Our choir meets every Thursday to practice hymns and worship songs that uplift our congregation during services.",
        choirMeetingTime: "Every Thursday at 6:00 PM",
        listenToSongs: "Listen to Our Songs",
        groupB: "Group B",
        groupBDesc: "This group specializes in traditional hymns and contemporary worship songs that resonate with our diverse congregation.",
        highschoolers: "Highschoolers",
        highschoolersDesc: "Our youth group brings energy and contemporary Christian music that speaks to the younger generation.",

        // Ceremonies
        ceremoniesTitle: "Israelite Ceremonies We Observe",
        ceremoniesSubtitle: "As part of our spiritual practice, we remember and observe certain ceremonies that connect us to our biblical roots.",
        passover: "Passover",
        passoverDesc: "We commemorate the Exodus from Egypt and reflect on Jesus as our Passover Lamb who was sacrificed for us.",
        passoverTime: "Observed in Spring",
        pentecost: "Pentecost (Shavuot)",
        pentecostDesc: "We celebrate the giving of the Torah at Mount Sinai and the outpouring of the Holy Spirit in the New Testament.",
        pentecostTime: "50 days after Passover",
        feastOfTrumpets: "Feast of Trumpets",
        feastOfTrumpetsDesc: "A day of blowing trumpets and spiritual preparation, looking forward to the return of Christ.",
        feastOfTrumpetsTime: "Autumn observance",
        feastOfTabernacles: "Feast of Tabernacles",
        feastOfTabernaclesDesc: "We remember Israel's wilderness journey and look forward to the Kingdom of God when He will dwell with us.",
        feastOfTabernaclesTime: "Autumn observance",

        // YouTube Section
        youtubeTitle: "Follow Us on YouTube",
        youtubeDesc: "Can't join us in person? Watch our services live or catch up with previous sermons on our YouTube channel. Don't forget to subscribe and turn on notifications so you never miss an update!",
        subscribeNow: "Subscribe Now",
        subscribers: "Subscribers",

        // Footer
        footerDesc: "A spiritual home dedicated to worshiping Elohim and serving our community with love and grace.",
        quickLinks: "Quick Links",
        contactUs: "Contact Us",

        // Notifications
        languageChanged: "Language changed to",
        subscribeSuccess: "Thank you for subscribing to our YouTube channel!",
        formSuccess: "Thank you for subscribing with:",
        formError: "Please enter a valid email address"
    },

    sw: {
        // Site Title
        siteTitle: "Kanisa la Kaloleni",
        ofElohim: "La Elohim",

        // Navigation
        navHome: "Nyumbani",
        navWatchOnline: "Tazama mtandaoni",
        navAboutUs: "Kuhusu sisi",
        navArchives: "Kumbukumbu",
        navContact: "Wasiliana",

        // Hero Section
        heroTitle: "Kuhusu Kanisa la Kaloleni",
        heroSubtitle: "Jifunze kuhusu jamii yetu, ratiba ya ibada, na mila zetu",
        scrollDown: "Sogeza Chini",

        // History Section
        ourStory: "Hadithi Yetu",
        theBeginning: "Mwanzo",
        beginningText: "Kanisa la Kaloleni lilianzishwa kwa maono ya kuunda jamii yenye nguvu ya waumini waliojitolea kutumikia Mungu na kueneza ujumbe wake wa upendo na wokovu.",
        growthExpansion: "Ukuaji na Upanuzi",
        growthText: "Kwa miaka, tumefikia kuwa mkusanyiko wa watu mbalimbali ambao wanakaribisha watu kutoka kila mahali, wameungana katika imani yetu na kujitolea kwa maadili ya Kikristo.",
        digitalMinistry: "Huduma ya Kidijitali",
        digitalText: "Kanisa letu limejengwa juu ya msingi wa maombi, ibada, na huduma, tukifuata mfano ulioanzishwa na Yesu Kristo. Tulipanua ufikiaji wetu kupitia huduma za mtandaoni.",

        // Stats
        members: "Wanachama",
        years: "Miaka",
        ministries: "Huduma",

        // Service Schedule
        serviceScheduleTitle: "Ratiba Yetu ya Huduma",
        serviceScheduleSubtitle: "Jiunge nasi kwa huduma zetu za kila wiki za ibada na ushirikiano",
        saturdayService: "Huduma ya Jumamosi",
        fridayService: "Huduma ya Ijumaa",
        weeklyActivities: "Shughuli za Kila Wiki",

        // Saturday Schedule
        prayerOpening: "Maombi na Ufunguzi",
        prayerOpeningDesc: "Tunaanza huduma yetu kwa maombi ya pamoja na nyimbo za ibada ili kuandaa mioyo yetu kwa ujumbe wa Mungu.",
        morningSermon: "Mahubiri ya Asubuhi",
        morningSermonDesc: "Mahubiri mafupi lakini yenye nguvu ya kutia moyo na kutuongoza katika wiki ijayo.",
        bibleStudy: "Masomo ya Biblia",
        bibleStudyDesc: "Somo la kina la Biblia ambapo tunachunguza maandiko na kujadili jinsi ya kuyatumia katika maisha yetu ya kila siku.",
        teaBreak: "Mapumziko ya Chai",
        teaBreakDesc: "Wakati wa ushirikiano na viburudisho tunapounganisha pamoja.",
        groupPresentations: "Mawasilisho ya Vikundi",
        groupPresentationsDesc: "Mawasilisho maalum na vikundi vyetu mbalimbali na kukaribisha wageni.",
        lunch: "Chakula cha Mchana",
        lunchDesc: "Tunashiriki chakula pamoja, tukiimarisha uhusiano wetu kama familia ya kanisa.",
        afternoonSession: "Kipindi cha Mchana",
        afternoonSessionDesc: "Nyimbo za mtu binafsi na mawasilisho ya kwaya, ikifuatiwa na mahubiri ya kufunga kabla hatujaondoka.",

        // Friday Schedule
        eveningWorship: "Ibada ya Jioni",
        eveningWorshipDesc: "Tunakusanyika kwa jioni ya maombi, ibada, na tafakari ili kumaliza wiki.",
        bibleStudyFriday: "Masomo ya Biblia",
        bibleStudyFridayDesc: "Kipindi cha masomo ya Biblia cha kushirikiana kinazingatia maisha ya vitendo ya Kikristo.",
        fellowship: "Ushirikiano",
        fellowshipDesc: "Wakati wa kushiriki ushuhuda na kujenga uhusiano ndani ya jamii ya kanisa.",

        // Weekly Activities
        prayerMeetings: "Mikutano ya Maombi",
        prayerMeetingsTime: "Jumatano | 7:00 PM",
        prayerMeetingsDesc: "Jiunge nasi kwa maombi ya pamoja na uombezi.",
        choirPractice: "Mazoezi ya Kwaya",
        choirPracticeTime: "Alhamisi | 6:00 PM",
        choirPracticeDesc: "Kwaya yetu inajiandaa kwa huduma za ibada za Jumapili.",
        youthFellowship: "Ushirikiano wa Vijana",
        youthFellowshipTime: "Ijumaa | 5:00 PM",
        youthFellowshipDesc: "Vijana wanakusanyika kwa masomo ya Biblia na shughuli.",

        // Music Ministry
        musicMinistryTitle: "Huduma Yetu ya Muziki",
        musicMinistrySubtitle: "Pata uzoefu wa nguvu za ibada kupitia vikundi vyetu mbalimbali vya muziki",
        choir: "Kwaya",
        choirDesc: "Kwaya yetu inakutana kila Alhamisi kufanya mazoezi ya nyimbo za ibada na nyimbo za ibada ambazo zinainua mkusanyiko wetu wakati wa huduma.",
        choirMeetingTime: "Kila Alhamisi saa 6:00 PM",
        listenToSongs: "Sikiliza Nyimbo Zetu",
        groupB: "Kikundi B",
        groupBDesc: "Kikundi hiki kinajulikana kwa nyimbo za jadi na nyimbo za kisasa za ibada ambazo zinaendana na mkusanyiko wetu wa watu mbalimbali.",
        highschoolers: "Wanafunzi wa Sekondari",
        highschoolersDesc: "Kikundi chetu cha vijana kinaleta nishati na muziki wa kisasa wa Kikristo ambao unazungumza na kizazi kipya.",

        // Ceremonies
        ceremoniesTitle: "Sherehe za Kiisraeli Tunazozingatia",
        ceremoniesSubtitle: "Kama sehemu ya mazoezi yetu ya kiroho, tunakumbuka na kuzingatia sherehe fulani ambazo zinatunganisha na mizizi yetu ya Biblia.",
        passover: "Pasaka",
        passoverDesc: "Tunakumbuka Kutoka kutoka Misri na kutafakari juu ya Yesu kama Mwana-Kondoo wetu wa Pasaka aliyetolewa dhabihu kwa ajili yetu.",
        passoverTime: "Inazingatiwa wakati wa Majira ya Kuchipua",
        pentecost: "Pentekoste (Shavuoti)",
        pentecostDesc: "Tunasherehekea kutolewa kwa Torati katika Mlima Sinai na kumwagika kwa Roho Mtakatifu katika Agano Jipya.",
        pentecostTime: "Siku 50 baada ya Pasaka",
        feastOfTrumpets: "Sikukuu ya Tarumbeta",
        feastOfTrumpetsDesc: "Siku ya kupiga tarumbeta na maandalizi ya kiroho, tukitazamia kurudi kwa Kristo.",
        feastOfTrumpetsTime: "Inazingatiwa wakati wa Vuli",
        feastOfTabernacles: "Sikukuu ya Vibanda",
        feastOfTabernaclesDesc: "Tunakumbuka safari ya Israeli jangwani na kutazamia Ufalme wa Mungu wakati atakapokaa nasi.",
        feastOfTabernaclesTime: "Inazingatiwa wakati wa Vuli",

        // YouTube Section
        youtubeTitle: "Tufuate kwenye YouTube",
        youtubeDesc: "Huwezi kujiunga nasi kibinafsi? Tazama huduma zetu moja kwa moja au fuatilia mahubiri ya awali kwenye kituo chetu cha YouTube. Usisahau kujiandikisha na kuwasha arifa ili usikose sasisho lolote!",
        subscribeNow: "Jiandikishe Sasa",
        subscribers: "Waliojisajili",

        // Footer
        footerDesc: "Nyumbani ya kiroho iliyojitolea kuabudu Elohim na kutumikia jamii yetu kwa upendo na neema.",
        quickLinks: "Viungo vya Haraka",
        contactUs: "Wasiliana Nasi",

        // Notifications
        languageChanged: "Lugha imebadilishwa kuwa",
        subscribeSuccess: "Asante kwa kujiandikisha kwenye kituo chetu cha YouTube!",
        formSuccess: "Asante kwa kujiandikisha na:",
        formError: "Tafadhali ingiza anwani halali ya barua pepe"
    },

    rw: {
        // Site Title
        siteTitle: "Itorero rya Kaloleni",
        ofElohim: "Rya Elohim",

        // Navigation
        navHome: "Ahabanza",
        navWatchOnline: "Reba kuri interineti",
        navAboutUs: "Twebwe",
        navArchives: "Ububiko",
        navContact: "Twandikire",

        // Hero Section
        heroTitle: "Kuri Itorero rya Kaloleni",
        heroSubtitle: "Wige kuri sosiyete yacu, gahunda y'isengesho, n'imigenzo yacu",
        scrollDown: "Manura Hasi",

        // History Section
        ourStory: "Inkuru Yacu",
        theBeginning: "Intangiriro",
        beginningText: "Itorero rya Kaloleni ryashinzwe rifite icyerekezo cyo gushinga umuryango ukomeye w'abizera biyemeje gukorera Imana no gukwirakwiza ubutumwa bwayo bw'urukundo n'agakiza.",
        growthExpansion: "Iterambere n'Ubwaguke",
        growthText: "Mu myaka, twakuze duhinduka itorero ry'abantu batandukanye ryakira abantu baturutse ahantu hatandukanye, bumwe mu kwizera kwacu no kwiyemeza indangagaciro z'ubukristo.",
        digitalMinistry: "Ubutumwa bwa Digitale",
        digitalText: "Itorero ryacu ryubatswe ku nkomoko y'isengesho, isengesho, n'ubutumwa, dukurikiza urugero rwashyizweho na Yesu Kristo. Twaguye ubushobozi bwacu binyuze muri serivisi zo kuri interineti.",

        // Stats
        members: "Abanyamuryango",
        years: "Imyaka",
        ministries: "Ubutumwa",

        // Service Schedule
        serviceScheduleTitle: "Gahunda Yacu y'Isengesho",
        serviceScheduleSubtitle: "Twinjire muri serivisi zacu za buri cyumweru z'isengesho n'ubumwe",
        saturdayService: "Serivisi ya Ku wa Gatandatu",
        fridayService: "Serivisi ya Ku wa Gatanu",
        weeklyActivities: "Ibikorwa bya Buri Cyumweru",

        // Saturday Schedule
        prayerOpening: "Isengesho no Gufungura",
        prayerOpeningDesc: "Dutangira serivisi yacu n'isengesho ry'abanyamuryango n'indirimbo z'isengesho kugira ngo dutegure imitima yacu ku butumwa bw'Imana.",
        morningSermon: "Ibibazo byo mu gitondo",
        morningSermonDesc: "Ibibazo bigufi ariko bikomeye byo gushishikariza no kutunyuza mu cyumweru kizaza.",
        bibleStudy: "Amasomo y'Ibitabo",
        bibleStudyDesc: "Isomo ry'ibitabo ryimbitse aho dusuzuma ibyanditswe kandi tuganira uburyo bwo kubikoresha mu buzima bwacu bwa buri munsi.",
        teaBreak: "Ikiruhuko cy'Icyayi",
        teaBreakDesc: "Igihe cyo guhuza no kuruhuka mugihe duhuza hamwe.",
        groupPresentations: "Ibiganiro by'Amatsinda",
        groupPresentationsDesc: "Ibiganiro bidasanzwe n'amatsinda yacu atandukanye no kwakira abashyitsi.",
        lunch: "Ifunguro rya Sasita",
        lunchDesc: "Dusangira ifunguro hamwe, dukomeretsa umubano wacu nk'umuryango w'itorero.",
        afternoonSession: "Icyumba cyo mu nyuma y'umunsi",
        afternoonSessionDesc: "Indirimbo z'umuntu ku giti cye n'ibiganiro by'amatorero, bikurikirwa n'ibibazo byo gufunga mbere y'uko tugenda.",

        // Friday Schedule
        eveningWorship: "Isengesho ryo mu mugoroba",
        eveningWorshipDesc: "Duteranira mu mugoroba w'isengesho, isengesho, no gutekereza kugira ngo durangize icyumweru.",
        bibleStudyFriday: "Amasomo y'Ibitabo",
        bibleStudyFridayDesc: "Icyumba cy'amasomo y'ibitabo cyihuza cyibanda ku buzima bw'ubukristo bw'ibikorwa.",
        fellowship: "Ubumwe",
        fellowshipDesc: "Igihe cyo gusangira ubuhamya no kubaka umubano mu muryango w'itorero.",

        // Weekly Activities
        prayerMeetings: "Inama z'Isengesho",
        prayerMeetingsTime: "Ku wa Gatatu | 7:00 PM",
        prayerMeetingsDesc: "Twinjire mu masengesho y'abanyamuryango no gusenga.",
        choirPractice: "Imyitozo y'Amatorero",
        choirPracticeTime: "Ku wa Kane | 6:00 PM",
        choirPracticeDesc: "Amatorero yacu yitegura serivisi z'isengesho za Ku cyumweru.",
        youthFellowship: "Ubumwe bw'Urubyiruko",
        youthFellowshipTime: "Ku wa Gatanu | 5:00 PM",
        youthFellowshipDesc: "Urubyiruko ruteranira amasomo y'ibitabo n'ibikorwa.",

        // Music Ministry
        musicMinistryTitle: "Ubutumwa Bwacu bw'Umuziki",
        musicMinistrySubtitle: "Hura imbaraga z'isengesho binyuze mu matsinda yacu atandukanye y'umuziki",
        choir: "Amatorero",
        choirDesc: "Amatorero yacu ahura buri wa Kane kugira ngo yitoze indirimbo z'isengesho n'indirimbo z'isengesho zizamura itorero ryacu mu gihe cy'isengesho.",
        choirMeetingTime: "Buri wa Kane saa 6:00 PM",
        listenToSongs: "Umva Indirimbo Zacu",
        groupB: "Itsinda B",
        groupBDesc: "Iri tsinda ryihariye mu ndirimbo gakondo n'indirimbo z'isengesho zigezweho zihuza n'itorero ryacu ry'abantu batandukanye.",
        highschoolers: "Abanyeshuri bo mu Mashuri Yisumbuye",
        highschoolersDesc: "Itsinda ryacu ry'urubyiruko rizana ingufu n'umuziki wa kijyambere w'ubukristo uvugana n'igisata gishya.",

        // Ceremonies
        ceremoniesTitle: "Imihango y'Abisirayeli Tubahiriza",
        ceremoniesSubtitle: "Nk'igice cy'imyitozo yacu y'umwuka, twibuka kandi tubahiriza imihango imwe iduhuza n'imizi yacu y'ibitabo.",
        passover: "Pasika",
        passoverDesc: "Twibuka Kuva muri Egiputa kandi tutekereza kuri Yesu nk'Intama yacu ya Pasika yatanzwe kuri twe.",
        passoverTime: "Yubahirizwa mu mpeshyi",
        pentecost: "Pentekosite (Shavuoti)",
        pentecostDesc: "Twizihiza gutangwa kw'Amategeko kuri Musine no gusuka kw'Umwuka Wera mu Sezerano Nshya.",
        pentecostTime: "Iminsi 50 nyuma ya Pasika",
        feastOfTrumpets: "Umunsi w'Amakondera",
        feastOfTrumpetsDesc: "Umunsi wo gukora amakondera no kwitegura mu mwuka, dukeka gusubira kwa Kristo.",
        feastOfTrumpetsTime: "Yubahirizwa mu mpeshyi",
        feastOfTabernacles: "Umunsi w'Ibihome",
        feastOfTabernaclesDesc: "Twibuka urugendo rw'Isirayeli mu butayu kandi dukeka Ubwami bw'Imana igihe azaba ari kumwe natwe.",
        feastOfTabernaclesTime: "Yubahirizwa mu mpeshyi",

        // YouTube Section
        youtubeTitle: "Dukurikire kuri YouTube",
        youtubeDesc: "Ntushobora kujya kuri twe mu muntu? Reba serivisi zacu ritaziguye cyangwa ukurikirane ibibazo byabanje kuri YouTube yacu. Ntiwibagirwe kwiyandikisha no gukuraho amakuru kugira ngo utakaze amakuru yose!",
        subscribeNow: "Iyandikishe Ubu",
        subscribers: "Abiyandikishije",

        // Footer
        footerDesc: "Inzu y'umwuka yiyemeje gusenga Elohim no gukorera sosiyete yacu n'urukundo n'ubuntu.",
        quickLinks: "Ihuza Byihuse",
        contactUs: "Twandikire",

        // Notifications
        languageChanged: "Ururimi rwahinduwe",
        subscribeSuccess: "Murakoze kwiyandikisha kuri YouTube yacu!",
        formSuccess: "Murakoze kwiyandikisha na:",
        formError: "Nyamuneka andika aderesi y'imeri yemewe"
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
    document.title = `${t.navAboutUs} - ${t.siteTitle}`;

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

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    loadLanguagePreference();
    updateLanguage();
    initializeApp();
});

function initializeApp() {
    // Language selector event listener
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            updateLanguage();
            const t = translations[currentLanguage];
            showNotification(`${t.languageChanged} ${e.target.options[e.target.selectedIndex].text}`);
        });
    }

    // Mobile Navigation Toggle
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
            if (!e.target.closest('.main-nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Schedule Tabs Functionality
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleDays = document.querySelectorAll('.schedule-day');

    if (scheduleTabs.length > 0) {
        scheduleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetDay = tab.getAttribute('data-day');

                // Update active tab
                scheduleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show corresponding schedule
                scheduleDays.forEach(day => {
                    day.classList.remove('active');
                    if (day.id === targetDay) {
                        day.classList.add('active');
                    }
                });
            });
        });
    }

    // YouTube Subscribe Button
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const t = translations[currentLanguage];
            window.open('https://www.youtube.com/@churchofelohimkaloleni', '_blank');
            showNotification(t.subscribeSuccess);
        });
    }

    // Form Submission Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const t = translations[currentLanguage];

            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showNotification(`${t.formSuccess} ${emailInput.value}`);
                emailInput.value = '';
            } else {
                showNotification(t.formError, 'error');
            }
        });
    });

    // YouTube Play Button Functionality
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const youtubeLink = btn.closest('.music-group').querySelector('.youtube-link');
            if (youtubeLink) {
                window.open(youtubeLink.href, '_blank');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize animations
    initAnimations();
}

// Enhanced Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add notification to page
    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Close notification on button click
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Enhanced Scroll Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.history-item, .music-group, .ceremony-card, .leader-card, .activity-card, .timeline-item'
    );

    // Set initial state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Add staggered delay for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Initialize counter animation
    initCounterAnimation();
}

// Enhanced Counter Animation
function initCounterAnimation() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = document.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.history-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            const navLinks = document.getElementById('navLinks');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks && mobileMenuBtn) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }, 250);
});

// Add error handling for missing elements
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});