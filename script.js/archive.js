document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURATION ---
    const ITEMS_PER_PAGE = 12;
    let currentLanguage = 'en';
    let currentPage = 1;
    let currentPreviewIndex = -1;
    let currentQuarter = '1';
    let allDocuments = [];
    let mainFilteredDocuments = [];
    let lessonFilteredDocuments = [];

    // --- 2. TRANSLATIONS ---
    const translations = {
        en: {
            siteTitle: 'M.T. Zion Archive',
            navHome: 'Home',
            navWatchOnline: 'Watch Online',
            navAboutUs: 'About Us',
            navArchives: 'Archives',
            navContact: 'Contact',
            pageTitle: 'Document Archive',
            searchPlaceholder: 'Search documents...',
            categoryFilter: 'All Categories',
            docCount: 'documents found',
            previewBtn: 'Preview',
            downloadBtn: 'Download',
            prevBtn: 'Previous',
            nextBtn: 'Next',
            noDocuments: 'No documents found',
            noDocumentsHelp: 'Try adjusting your search or filter criteria',
            allCategories: 'All Categories',
            lessonsTitle: 'Bible Lessons',
            lessonsSearch: 'Search lessons...',
            q1: 'Q1 (Jan-Mar)',
            q2: 'Q2 (Apr-Jun)',
            q3: 'Q3 (Jul-Sep)',
            q4: 'Q4 (Oct-Dec)',
            comingSoon: 'Coming Soon',
            lessonNotAvailable: 'This quarter\'s lessons are not available yet.',
            memoryVerse: 'Memory Verse',
            viewLesson: 'View Lesson',
            loadingPdf: 'Loading PDF...',
            pdfLoadError: 'Failed to load PDF',
            downloadInstead: 'Download Instead'
        },
        sw: {
            siteTitle: 'Hifadhidata ya M.T. Zion',
            navHome: 'Nyumbani',
            navWatchOnline: 'Tazama Mtandaoni',
            navAboutUs: 'Kuhusu Sisi',
            navArchives: 'Maktaba',
            navContact: 'Wasiliana',
            pageTitle: 'Maktaba ya Nyaraka',
            searchPlaceholder: 'Tafuta nyaraka...',
            categoryFilter: 'Aina Zote',
            docCount: 'nyaraka zimepatikana',
            previewBtn: 'Onyesha',
            downloadBtn: 'Pakua',
            prevBtn: 'Iliyopita',
            nextBtn: 'Ifuatayo',
            noDocuments: 'Hakuna nyaraka zimepatikana',
            noDocumentsHelp: 'Jaribu kubadilisha utafutaji wako au vigezo vya kuchuja',
            allCategories: 'Aina Zote',
            lessonsTitle: 'Masomo ya Biblia',
            lessonsSearch: 'Tafuta masomo...',
            q1: 'R1 (Jan-Machi)',
            q2: 'R2 (Apr-Jun)',
            q3: 'R3 (Jul-Sep)',
            q4: 'R4 (Okt-Des)',
            comingSoon: 'Inakuja Hivi Karibuni',
            lessonNotAvailable: 'Masomo ya robo hii hayapatikani bado.',
            memoryVerse: 'Suru ya Kumbukumbu',
            viewLesson: 'Ona Masomo',
            loadingPdf: 'Inapakia PDF...',
            pdfLoadError: 'Imeshindwa kupakia PDF',
            downloadInstead: 'Pakua Badala Yake'
        },
        rw: {
            siteTitle: 'Ububiko bwa M.T. Zion',
            navHome: 'Ahabanza',
            navWatchOnline: 'Kureba kuri Interineti',
            navAboutUs: 'Ibyerekeye',
            navArchives: 'Ububiko',
            navContact: 'Twandikire',
            pageTitle: 'Ububiko bwa Inyandiko',
            searchPlaceholder: 'Shakisha inyandiko...',
            categoryFilter: 'Amitwe Yose',
            docCount: 'inyandiko zabonetse',
            previewBtn: 'Kureba',
            downloadBtn: 'Kureka',
            prevBtn: 'Ibura',
            nextBtn: 'Ikurikira',
            noDocuments: 'Nta nyandiko zabonetse',
            noDocumentsHelp: 'Gerageza guhindura ishakisha ryawe canke ibipimo byo gukurikiza',
            allCategories: 'Amitwe Yose',
            lessonsTitle: 'Amasomo ya Bibiliya',
            lessonsSearch: 'Shakisha amasomo...',
            q1: 'S1 (Mut-Wer)',
            q2: 'S2 (Msh-Gic)',
            q3: 'S3 (Kam-Nze)',
            q4: 'S4 (Uku-Gic)',
            comingSoon: 'Kuzagera Vuba',
            lessonNotAvailable: 'Amasomo ya kwegi siyaboneka bityo.',
            memoryVerse: 'Umugabane Wibuka',
            viewLesson: 'Kureba Amasomo',
            loadingPdf: 'Kureba PDF...',
            pdfLoadError: 'Byanze bikomeye kureba PDF',
            downloadInstead: 'Reka Uko'
        }
    };

    // --- 3. BIBLE LESSONS DATA ---
    const bibleLessons = {
        1: {
            title: 'First Quarter (January-March)',
            available: true,
            lessons: [
                {
                    id: 'q1-1',
                    title: 'Lesson 1: The Creation',
                    date: 'January 7, 2024',
                    description: 'Understanding the creation story and its significance.',
                    memoryVerse: 'In the beginning God created the heavens and the earth. - Genesis 1:1',
                    pdfUrl: 'lessons/q1/lesson-1-creation.pdf'
                },
                {
                    id: 'q1-2',
                    title: 'Lesson 2: The Fall',
                    date: 'January 14, 2024',
                    description: 'The story of Adam and Eve and the consequences of sin.',
                    memoryVerse: 'For the wages of sin is death, but the gift of God is eternal life. - Romans 6:23',
                    pdfUrl: 'lessons/q1/lesson-2-fall.pdf'
                },
                {
                    id: 'q1-3',
                    title: 'Lesson 3: The Flood',
                    date: 'January 21, 2024',
                    description: 'Noah\'s ark and God\'s promise of redemption.',
                    memoryVerse: 'But Noah found favor in the eyes of the LORD. - Genesis 6:8',
                    pdfUrl: 'lessons/q1/lesson-3-flood.pdf'
                }
            ]
        },
        2: {
            title: 'Second Quarter (April-June)',
            available: true,
            lessons: [
                {
                    id: 'q2-1',
                    title: 'Lesson 1: Abraham\'s Call',
                    date: 'April 7, 2024',
                    description: 'God\'s call to Abraham and the promise of descendants.',
                    memoryVerse: 'The LORD had said to Abram, "Go from your country... to the land I will show you." - Genesis 12:1',
                    pdfUrl: 'lessons/q2/lesson-1-abraham-call.pdf'
                },
                {
                    id: 'q2-2',
                    title: 'Lesson 2: Isaac and Jacob',
                    date: 'April 14, 2024',
                    description: 'The continuation of God\'s promise through Isaac and Jacob.',
                    memoryVerse: 'I am with you and will watch over you wherever you go. - Genesis 28:15',
                    pdfUrl: 'lessons/q2/lesson-2-isaac-jacob.pdf'
                }
            ]
        },
        3: {
            title: 'Third Quarter (July-September)',
            available: false,
            lessons: []
        },
        4: {
            title: 'Fourth Quarter (October-December)',
            available: false,
            lessons: []
        }
    };

    // --- 4. HELPER FUNCTIONS ---
    function getDocumentPath(doc) {
        // Check if it's a lesson (has pdfUrl property)
        if (doc.pdfUrl) {
            return doc.pdfUrl;
        }
        
        // Check if it's a regular document with fileName
        if (doc.fileName) {
            // If fileName already includes path, use it as is
            if (doc.fileName.startsWith('documents/') || doc.fileName.startsWith('lessons/')) {
                return doc.fileName;
            }
            return `documents/${doc.fileName}`;
        }
        
        // Fallback for documents without fileName
        const category = doc.category || 'uncategorized';
        const title = doc.title.replace(/\s+/g, '-').toLowerCase();
        return `documents/${category}/${title}.pdf`;
    }

    function getFileNameForDownload(doc) {
        if (doc.fileName) {
            // Extract just the filename from the path
            const parts = doc.fileName.split('/');
            return parts[parts.length - 1];
        }
        // For lessons, use the title as filename
        if (doc.pdfUrl) {
            const parts = doc.pdfUrl.split('/');
            return parts[parts.length - 1];
        }
        // Fallback
        const title = doc.title.replace(/\s+/g, '-').toLowerCase();
        return `${title}.pdf`;
    }

    // --- 5. DOCUMENT DATA ---
    function getDocumentData() {
        return [
            { id: 1, title: "M.T. Zion Report 2024", category: "m.t zion report", fileName: "m.t-zion/2024-report.pdf" },
            { id: 2, title: "SEP Report 2023", category: "Sep Reports", fileName: "sep/2023-report.pdf" },
            { id: 3, title: "Judah Report 2023", category: "Judah Reports", fileName: "judah/2023-report.pdf" },
            { id: 4, title: "Date Report 2023", category: "Date Reports", fileName: "date/2023-report.pdf" },
            { id: 5, title: "Elul Report 2023", category: "Elul pdf", fileName: "elul/2023-report.pdf" },
            { id: 6, title: "Sebat Report 2023", category: "Sebat pdf", fileName: "sebat/2023-report.pdf" },
            { id: 7, title: "Bul Report 2023", category: "Bul pdf", fileName: "bul/2023-report.pdf" },
            { id: 8, title: "Chisleu Report 2023", category: "Chisleu pdf", fileName: "chisleu/2023-report.pdf" },
            { id: 9, title: "Zif Report 2023", category: "Zif pdf", fileName: "zif/2023-report.pdf" },
            { id: 10, title: "Zif Sivan Report 2023", category: "Zif sivan pdf", fileName: "zif-sivan/2023-report.pdf" },
            { id: 11, title: "Tibet Report 2023", category: "Tibet pdf", fileName: "tibet/2023-report.pdf" },
            { id: 12, title: "Ethanim Report 2023", category: "Ethanim pdf", fileName: "ethanim/2023-report.pdf" },
            { id: 13, title: "Sivan Report 2023", category: "Sivan pdf", fileName: "sivan/2023-report.pdf" },
            { id: 14, title: "Tebet Report 2023", category: "Tebet pdf", fileName: "tebet/2023-report.pdf" },
            { id: 15, title: "Chesleu Report 2023", category: "Chesleu pdf", fileName: "chesleu/2023-report.pdf" },
            { id: 16, title: "Bul Chisleu Report 2023", category: "Bul-chisleu pdf", fileName: "bul-chisleu/2023-report.pdf" },
            { id: 17, title: "Nisan Report 2023", category: "Nisan pdf", fileName: "nisan/2023-report.pdf" },
            { id: 18, title: "July Report 2023", category: "July pdf", fileName: "july/2023-report.pdf" },
            { id: 19, title: "March Report 2023", category: "March pdf", fileName: "march/2023-report.pdf" },
            { id: 20, title: "May Report 2023", category: "May pdf", fileName: "may/2023-report.pdf" },
            { id: 21, title: "Sivan Lesson", category: "sivan", fileName: "sivan/lesson.pdf" },
            { id: 22, title: "Sebat Lesson", category: "sebat", fileName: "sebat/lesson.pdf" },
            { id: 23, title: "M.T. Zion Report 2022", category: "m.t zion report", fileName: "m.t-zion/2022-report.pdf" },
            { id: 24, title: "SEP Report 2022", category: "Sep Reports", fileName: "sep/2022-report.pdf" },
            { id: 25, title: "Judah Report 2022", category: "Judah Reports", fileName: "judah/2022-report.pdf" },
            { id: 26, title: "Date Report 2022", category: "Date Reports", fileName: "date/2022-report.pdf" },
            { id: 27, title: "Elul Report 2022", category: "Elul pdf", fileName: "elul/2022-report.pdf" },
            { id: 28, title: "Sebat Report 2022", category: "Sebat pdf", fileName: "sebat/2022-report.pdf" },
            { id: 29, title: "Bul Report 2022", category: "Bul pdf", fileName: "bul/2022-report.pdf" },
            { id: 30, title: "Chisleu Report 2022", category: "Chisleu pdf", fileName: "chisleu/2022-report.pdf" },
            { id: 31, title: "Zif Report 2022", category: "Zif pdf", fileName: "zif/2022-report.pdf" },
            { id: 32, title: "Zif Sivan Report 2022", category: "Zif sivan pdf", fileName: "zif-sivan/2022-report.pdf" },
            { id: 33, title: "Tibet Report 2022", category: "Tibet pdf", fileName: "tibet/2022-report.pdf" },
            { id: 34, title: "Ethanim Report 2022", category: "Ethanim pdf", fileName: "ethanim/2022-report.pdf" },
            { id: 35, title: "Sivan Report 2022", category: "Sivan pdf", fileName: "sivan/2022-report.pdf" },
            { id: 36, title: "Tebet Report 2022", category: "Tebet pdf", fileName: "tebet/2022-report.pdf" },
            { id: 37, title: "Chesleu Report 2022", category: "Chesleu pdf", fileName: "chesleu/2022-report.pdf" },
            { id: 38, title: "Bul Chisleu Report 2022", category: "Bul-chisleu pdf", fileName: "bul-chisleu/2022-report.pdf" },
            { id: 39, title: "Nisan Report 2022", category: "Nisan pdf", fileName: "nisan/2022-report.pdf" },
            { id: 40, title: "July Report 2022", category: "July pdf", fileName: "july/2022-report.pdf" },
            { id: 41, title: "March Report 2022", category: "March pdf", fileName: "march/2022-report.pdf" },
            { id: 42, title: "May Report 2022", category: "May pdf", fileName: "may/2022-report.pdf" },
            { id: 43, title: "M.T. Zion Report 2021", category: "m.t zion report", fileName: "m.t-zion/2021-report.pdf" },
            { id: 44, title: "SEP Report 2021", category: "Sep Reports", fileName: "sep/2021-report.pdf" },
            { id: 45, title: "Judah Report 2021", category: "Judah Reports", fileName: "judah/2021-report.pdf" },
            { id: 46, title: "Date Report 2021", category: "Date Reports", fileName: "date/2021-report.pdf" },
            { id: 47, title: "Elul Report 2021", category: "Elul pdf", fileName: "elul/2021-report.pdf" },
            { id: 48, title: "Sebat Report 2021", category: "Sebat pdf", fileName: "sebat/2021-report.pdf" },
            { id: 49, title: "Bul Report 2021", category: "Bul pdf", fileName: "bul/2021-report.pdf" },
            { id: 50, title: "Chisleu Report 2021", category: "Chisleu pdf", fileName: "chisleu/2021-report.pdf" },
            { id: 51, title: "Zif Report 2021", category: "Zif pdf", fileName: "zif/2021-report.pdf" },
            { id: 52, title: "Zif Sivan Report 2021", category: "Zif sivan pdf", fileName: "zif-sivan/2021-report.pdf" },
            { id: 53, title: "Tibet Report 2021", category: "Tibet pdf", fileName: "tibet/2021-report.pdf" },
            { id: 54, title: "Ethanim Report 2021", category: "Ethanim pdf", fileName: "ethanim/2021-report.pdf" },
            { id: 55, title: "Sivan Report 2021", category: "Sivan pdf", fileName: "sivan/2021-report.pdf" },
            { id: 56, title: "Tebet Report 2021", category: "Tebet pdf", fileName: "tebet/2021-report.pdf" },
            { id: 57, title: "Chesleu Report 2021", category: "Chesleu pdf", fileName: "chesleu/2021-report.pdf" },
            { id: 58, title: "Bul Chisleu Report 2021", category: "Bul-chisleu pdf", fileName: "bul-chisleu/2021-report.pdf" },
            { id: 59, title: "Nisan Report 2021", category: "Nisan pdf", fileName: "nisan/2021-report.pdf" },
            { id: 60, title: "July Report 2021", category: "July pdf", fileName: "july/2021-report.pdf" },
            { id: 61, title: "March Report 2021", category: "March pdf", fileName: "march/2021-report.pdf" },
            { id: 62, title: "May Report 2021", category: "May pdf", fileName: "may/2021-report.pdf" },
            { id: 63, title: "M.T. Zion Report 2020", category: "m.t zion report", fileName: "m.t-zion/2020-report.pdf" },
            { id: 64, title: "SEP Report 2020", category: "Sep Reports", fileName: "sep/2020-report.pdf" },
            { id: 65, title: "Judah Report 2020", category: "Judah Reports", fileName: "judah/2020-report.pdf" },
            { id: 66, title: "Date Report 2020", category: "Date Reports", fileName: "date/2020-report.pdf" },
            { id: 67, title: "Elul Report 2020", category: "Elul pdf", fileName: "elul/2020-report.pdf" },
            { id: 68, title: "Sebat Report 2020", category: "Sebat pdf", fileName: "sebat/2020-report.pdf" },
            { id: 69, title: "Bul Report 2020", category: "Bul pdf", fileName: "bul/2020-report.pdf" },
            { id: 70, title: "Chisleu Report 2020", category: "Chisleu pdf", fileName: "chisleu/2020-report.pdf" },
            { id: 71, title: "Zif Report 2020", category: "Zif pdf", fileName: "zif/2020-report.pdf" },
            { id: 72, title: "Zif Sivan Report 2020", category: "Zif sivan pdf", fileName: "zif-sivan/2020-report.pdf" },
            { id: 73, title: "Tibet Report 2020", category: "Tibet pdf", fileName: "tibet/2020-report.pdf" },
            { id: 74, title: "Ethanim Report 2020", category: "Ethanim pdf", fileName: "ethanim/2020-report.pdf" },
            { id: 75, title: "Sivan Report 2020", category: "Sivan pdf", fileName: "sivan/2020-report.pdf" },
            { id: 76, title: "Tebet Report 2020", category: "Tebet pdf", fileName: "tebet/2020-report.pdf" },
            { id: 77, title: "Chesleu Report 2020", category: "Chesleu pdf", fileName: "chesleu/2020-report.pdf" },
            { id: 78, title: "Bul Chisleu Report 2020", category: "Bul-chisleu pdf", fileName: "bul-chisleu/2020-report.pdf" },
            { id: 79, title: "Nisan Report 2020", category: "Nisan pdf", fileName: "nisan/2020-report.pdf" },
            { id: 80, title: "July Report 2020", category: "July pdf", fileName: "july/2020-report.pdf" },
            { id: 81, title: "March Report 2020", category: "March pdf", fileName: "march/2020-report.pdf" },
            { id: 82, title: "May Report 2020", category: "May pdf", fileName: "may/2020-report.pdf" },
            { id: 83, title: "Judah/98-Chisleu", category: "Judah", fileName: "judah/98-Chisleu.pdf" },
            { id: 84, title: "Judah/99-Tebet", category: "Judah", fileName: "judah/99-Tebet.pdf" },
            { id: 85, title: "Judah/97-Sebat", category: "Judah", fileName: "judah/97-Sebat.pdf" },
            { id: 86, title: "Judah/96-Nisan", category: "Judah", fileName: "judah/96-Nisan.pdf" },
            { id: 87, title: "Judah/95-Iyar", category: "Judah", fileName: "judah/95-Iyar.pdf" },
            { id: 88, title: "Judah/99-Sivan", category: "Judah", fileName: "judah/99-Sivan.pdf" },
            { id: 89, title: "Judah/95-Tammuz", category: "Judah", fileName: "judah/95-Tammuz.pdf" },
            { id: 90, title: "Judah/95-Ab", category: "Judah", fileName: "judah/95-Ab.pdf" },
            { id: 91, title: "Judah/95-Elul", category: "Judah", fileName: "judah/95-Elul.pdf" },
            { id: 92, title: "Judah/94-Tisri", category: "Judah", fileName: "judah/94-Tisri.pdf" },
            { id: 93, title: "Judah/96-March", category: "Judah", fileName: "judah/96-March.pdf" },
            { id: 94, title: "Judah/94-Heshvan", category: "Judah", fileName: "judah/94-Heshvan.pdf" },
            { id: 95, title: "Judah/94-Chisleu", category: "Judah", fileName: "judah/94-Chisleu.pdf" },
            { id: 96, title: "Judah/94-Tebet", category: "Judah", fileName: "judah/94-Tebet.pdf" },
            { id: 97, title: "Judah/93-Sebat", category: "Judah", fileName: "judah/93-Sebat.pdf" },
            { id: 98, title: "Judah/93-Adar", category: "Judah", fileName: "judah/93-Adar.pdf" },
            { id: 99, title: "Judah/93-Nisan", category: "Judah", fileName: "judah/93-Nisan.pdf" },
            { id: 100, title: "Judah/93-Iyar", category: "Judah", fileName: "judah/93-Iyar.pdf" },
            { id: 101, title: "Judah/93-Sivan", category: "Judah", fileName: "judah/93-Sivan.pdf" },
            { id: 102, title: "Judah/93-Tammuz", category: "Judah", fileName: "judah/93-Tammuz.pdf" },
            { id: 103, title: "Judah/93-Ab", category: "Judah", fileName: "judah/93-Ab.pdf" },
            { id: 104, title: "Judah/93-Elul", category: "Judah", fileName: "judah/93-Elul.pdf" },
            { id: 105, title: "Judah/83 Elul", category: "Judah", fileName: "judah/83-Elul.pdf" },
            { id: 106, title: "Judah/98 Nov", category: "Judah", fileName: "judah/98-Nov.pdf" },
            { id: 107, title: "Judah/96-August", category: "Judah", fileName: "judah/96-Aug.pdf" },
            { id: 108, title: "Judah/88-Bul", category: "Judah", fileName: "judah/88-Bul.pdf" },
            { id: 109, title: "Judah/85-Chisleu", category: "Judah", fileName: "judah/85-Chesleu.pdf" },
            { id: 110, title: "Judah/73-July", category: "Judah", fileName: "judah/73-July.pdf" },
            { id: 111, title: "Judah/81-chisleu", category: "Judah", fileName: "judah/81-Chesleu.pdf" },
            { id: 112, title: "Judah/97-March", category: "Judah", fileName: "judah/97-March.pdf" },
            { id: 113, title: "Judah/91- May", category: "Judah", fileName: "judah/91-May.pdf" },
            { id: 114, title: "Judah/81-July", category: "Judah", fileName: "judah/81-July.pdf" },
            { id: 115, title: "Judah/79-Zif", category: "Judah", fileName: "judah/79-Zif.pdf" },
            { id: 116, title: "Judah/79-Ethanim", category: "Judah", fileName: "judah/79-Ethanim.pdf" },
            { id: 117, title: "Judah/81-August", category: "Judah", fileName: "judah/81-August.pdf" },
            { id: 118, title: "Judah/77-August", category: "Judah", fileName: "judah/77-August.pdf" },
            { id: 119, title: "Judah/73-Zif", category: "Judah", fileName: "judah/73-Zif.pdf" },
            { id: 120, title: "Judah/Zif-Sivan", category: "Judah", fileName: "judah/77-Zif-Sivan.pdf" },
            { id: 121, title: "Judah/72-July", category: "Judah", fileName: "judah/72-July.pdf" },
            { id: 122, title: "Judah/89-August", category: "Judah", fileName: "judah/89-August.pdf" },
            { id: 123, title: "Judah/93-May", category: "Judah", fileName: "judah/93-May.pdf" },
            { id: 124, title: "Judah/73-bul", category: "Judah", fileName: "judah/73-Bul.pdf" },
            { id: 125, title: "Judah/73-chisleu", category: "Judah", fileName: "judah/73-Chisleu.pdf" },
            { id: 126, title: "Judah/72-Elul", category: "Judah", fileName: "judah/72-Elul.pdf" },
            { id: 127, title: "Judah/82-Ethanim", category: "Judah", fileName: "judah/82-Ethanim.pdf" },
            { id: 128, title: "Judah/MZR2008-Q2", category: "Judah", fileName: "judah/MZR2008-Q2.pdf" },
            { id: 129, title: "Judah/95MarchApr", category: "Judah", fileName: "judah/Judah-95MarApr.pdf" },
            { id: 130, title: "Judah/90", category: "Judah", fileName: "judah/Judah-90.pdf" },
            { id: 131, title: "Judah/July-1987", category: "Judah", fileName: "judah/July-1987.pdf" },
            { id: 132, title: "Judah/June-1974", category: "Judah", fileName: "judah/June-1974.pdf" },
            { id: 133, title: "Judah/March-1974", category: "Judah", fileName: "judah/March-1974.pdf" },
            { id: 134, title: "Judah/May-1972", category: "Judah", fileName: "judah/May-1972.pdf" },
            { id: 135, title: "Judah/Nov-Bul-1959", category: "Judah", fileName: "judah/Nov-Bul-1959.pdf" },
            { id: 136, title: "Judah/June-1971", category: "Judah", fileName: "judah/Judah-June-1971.pdf" },
            { id: 137, title: "Judah/Octomber-1970", category: "Judah", fileName: "judah/Judah-Oct-1970.pdf" },
            { id: 138, title: "Judah/Feb-1971", category: "Judah", fileName: "judah/Judah-Feb-1971.pdf" },
            { id: 139, title: "Judah/May-1971", category: "Judah", fileName: "judah/Judah-May-1971.pdf" },
            { id: 140, title: "Judah/Dec-1974", category: "Judah", fileName: "judah/Judah-Dec-1974-2.pdf" },
            { id: 141, title: "Judah/1960-Bul-November", category: "Judah", fileName: "judah/Judah-1960-Bul-November.pdf" },
            { id: 142, title: "Judah/1960-Chisleu-December", category: "Judah", fileName: "judah/Judah-1960-Chisleu-December.pdf" },
            { id: 143, title: "Judah/1961-Tebet-January", category: "Judah", fileName: "judah/Judah-1961-Tebet-January.pdf" },
            { id: 144, title: "Judah/1961-Sebat-February", category: "Judah", fileName: "judah/Judah-1961-Sebat-February.pdf" },
            { id: 145, title: "Judah/1961-Adar-March", category: "Judah", fileName: "judah/Judah-1961-Adar-March.pdf" },
            { id: 146, title: "Judah/1961-Nisan-April", category: "Judah", fileName: "judah/Judah-1961-Nisan-April.pdf" },
            { id: 147, title: "Judah/1961-Iyar-May", category: "Judah", fileName: "judah/Judah-1961-Iyar-May.pdf" },
            { id: 148, title: "Judah/1961-Sivan-June", category: "Judah", fileName: "judah/Judah-1961-Sivan-June.pdf" },
            { id: 149, title: "Judah/1961-Tammuz-July", category: "Judah", fileName: "judah/Judah-1961-Tammuz-July.pdf" },
            { id: 150, title: "Judah/1961-Ab-August", category: "Judah", fileName: "judah/Judah-1961-Ab-August.pdf" },
            { id: 151, title: "Judah/1961-Elul-September", category: "Judah", fileName: "judah/Judah-1961-Elul-September.pdf" },
            { id: 152, title: "Judah/1961-Tisri-October", category: "Judah", fileName: "judah/Judah-1961-Tisri-October.pdf" },
            { id: 153, title: "Judah/1961-Heshvan-November", category: "Judah", fileName: "judah/Judah-1961-Heshvan-November.pdf" }
        ];
    }

    // --- 6. DOM ELEMENT REFERENCES ---
    const languageSelect = document.getElementById('language-select');
    const mainSearchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const documentList = document.getElementById('document-list');
    const docCount = document.getElementById('doc-count');
    const pagination = document.getElementById('pagination');

    const lessonSearchInput = document.getElementById('lessons-search');
    const lessonList = document.getElementById('lessons-list');
    const quarterPills = document.querySelectorAll('.quarter-pill');

    // Modal elements
    const modal = document.getElementById('pdf-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.getElementById('modal-close');
    const pdfViewer = document.getElementById('pdf-viewer');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    const modalDownload = document.getElementById('modal-download');

    // --- 7. NAVIGATION ELEMENTS ---
    const navHome = document.querySelector('a[href="index.html"]');
    const navWatchOnline = document.querySelector('a[href="watch online.html"]');
    const navAboutUs = document.querySelector('a[href="about us.html"]');
    const navArchives = document.querySelector('a[href="Archive.html"]');
    const navContact = document.querySelector('a[href="contact.html"]');

    // --- 8. INITIALIZATION ---
    function init() {
        // Load preferences first
        loadPreferences();
        loadSavedLessons();
        
        // Then load data
        allDocuments = getDocumentData();

        // Setup UI
        populateCategories();
        setupEventListeners();
        setupHamburgerMenu();

        // Set initial active quarter pill
        const activePill = document.querySelector(`.quarter-pill[data-quarter="${currentQuarter}"]`);
        if (activePill) {
            quarterPills.forEach(p => p.classList.remove('active'));
            activePill.classList.add('active');
        }

        // Initial render
        handleMainFilterChange();
        handleLessonFilterChange();
        updateLanguage();
    }

    // --- 9. EVENT LISTENERS ---
    function setupEventListeners() {
        // Language selector
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            localStorage.setItem('preferredLanguage', currentLanguage);
            updateLanguage();
            renderPage(currentPage);
            renderLessonsSidebar();
            populateCategories();
        });

        // Main search and filter
        mainSearchInput.addEventListener('input', debounce(handleMainFilterChange, 300));
        categoryFilter.addEventListener('change', handleMainFilterChange);

        // Lessons search
        lessonSearchInput.addEventListener('input', debounce(handleLessonFilterChange, 300));
        
        // Quarter pills
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quarter-pill')) {
                const pill = e.target.closest('.quarter-pill');
                quarterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentQuarter = pill.dataset.quarter;
                handleLessonFilterChange();
            }
        });

        // Modal listeners
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        modalPrev.addEventListener('click', showPrevDocument);
        modalNext.addEventListener('click', showNextDocument);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('visible')) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowLeft' && !modalPrev.disabled) showPrevDocument();
                if (e.key === 'ArrowRight' && !modalNext.disabled) showNextDocument();
            }
        });

        // Prevent PDF viewer from closing modal when clicking inside
        pdfViewer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Debounce function for search inputs
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // --- 10. FILTER FUNCTIONS ---
    function handleMainFilterChange() {
        const searchTerm = mainSearchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;

        mainFilteredDocuments = allDocuments.filter(doc => {
            const titleMatch = doc.title.toLowerCase().includes(searchTerm);
            const categoryMatch = doc.category.toLowerCase().includes(searchTerm);
            const fileNameMatch = doc.fileName ? 
                doc.fileName.toLowerCase().includes(searchTerm) : false;
            const filterMatch = (category === 'all') || (doc.category === category);

            return (titleMatch || categoryMatch || fileNameMatch) && filterMatch;
        });

        currentPage = 1;
        renderPage(currentPage);
    }

    function handleLessonFilterChange() {
        const searchTerm = lessonSearchInput.value.toLowerCase().trim();
        const quarter = bibleLessons[currentQuarter];

        // If the quarter is not available yet, show a message
        if (!quarter || !quarter.available) {
            renderComingSoonMessage();
            lessonFilteredDocuments = [];
            return;
        }

        // Filter lessons for the current quarter
        lessonFilteredDocuments = quarter.lessons.filter(lesson => {
            const titleMatch = lesson.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = lesson.description.toLowerCase().includes(searchTerm);
            const memoryVerseMatch = lesson.memoryVerse.toLowerCase().includes(searchTerm);
            return titleMatch || descriptionMatch || memoryVerseMatch;
        });

        renderLessonsSidebar();
    }

    function renderComingSoonMessage() {
        const t = translations[currentLanguage];
        lessonList.innerHTML = `
            <div class="coming-soon">
                <i class="fas fa-calendar-clock"></i>
                <h4>${t.comingSoon}</h4>
                <p>${t.lessonNotAvailable}</p>
            </div>
        `;
    }

    // --- 11. RENDERING FUNCTIONS ---
    function populateCategories() {
        const t = translations[currentLanguage];
        const categories = [...new Set(allDocuments.map(doc => doc.category))];

        categoryFilter.innerHTML = `<option value="all">${t.allCategories}</option>`;
        categories.sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function renderPage(page) {
        currentPage = page;
        documentList.innerHTML = '';

        const totalDocs = mainFilteredDocuments.length;
        const totalPages = Math.ceil(totalDocs / ITEMS_PER_PAGE);

        if (totalDocs === 0) {
            renderNoDocuments();
            renderPagination(0, 0);
            docCount.textContent = `0 ${translations[currentLanguage].docCount}`;
            return;
        }

        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = Math.min(start + ITEMS_PER_PAGE, totalDocs);
        const paginatedDocs = mainFilteredDocuments.slice(start, end);

        paginatedDocs.forEach(doc => {
            const card = createDocumentCard(doc);
            documentList.appendChild(card);
        });

        renderPagination(totalPages, page);
        docCount.textContent = `${totalDocs} ${translations[currentLanguage].docCount}`;
    }

    function renderLessonsSidebar() {
        lessonList.innerHTML = '';

        const quarter = bibleLessons[currentQuarter];
        
        // Add quarter title
        const quarterTitle = document.createElement('div');
        quarterTitle.className = 'quarter-title';
        quarterTitle.textContent = quarter.title;
        lessonList.appendChild(quarterTitle);

        if (lessonFilteredDocuments.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results-sidebar';
            noResults.innerHTML = `
                <i class="fas fa-search"></i>
                <p>No lessons found. Try a different search.</p>
            `;
            lessonList.appendChild(noResults);
            return;
        }

        lessonFilteredDocuments.forEach(lesson => {
            const card = document.createElement('div');
            card.className = 'lesson-card';

            card.innerHTML = `
                <div class="lesson-header">
                    <h4 class="lesson-title">${lesson.title}</h4>
                    <span class="lesson-date">${lesson.date}</span>
                </div>
                <p class="lesson-description">${lesson.description}</p>
                <div class="lesson-memory-verse">
                    <strong>${translations[currentLanguage].memoryVerse}:</strong> ${lesson.memoryVerse}
                </div>
                <div class="lesson-actions">
                    <button class="btn btn-secondary btn-view-lesson" data-lesson-id="${lesson.id}">
                        <i class="fas fa-eye"></i> ${translations[currentLanguage].viewLesson}
                    </button>
                    <a href="${lesson.pdfUrl}" download="${lesson.title}.pdf" class="btn btn-primary btn-download-lesson">
                        <i class="fas fa-download"></i> ${translations[currentLanguage].downloadBtn}
                    </a>
                </div>
            `;

            // Add event listener for view button
            card.querySelector('.btn-view-lesson').addEventListener('click', (e) => {
                e.stopPropagation();
                openLessonModal(lesson);
            });

            lessonList.appendChild(card);
        });
    }

    function createDocumentCard(doc) {
        const t = translations[currentLanguage];
        const card = document.createElement('div');
        card.className = 'document-card';

        // Use the helper function to get the correct path
        const docPath = getDocumentPath(doc);
        const fileNameForDownload = getFileNameForDownload(doc);

        card.innerHTML = `
            <div class="doc-card-body">
                <div class="document-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="document-info">
                    <h4 class="document-title">${doc.title}</h4>
                    <div class="document-meta">
                        <span class="document-category">${doc.category}</span>
                    </div>
                </div>
            </div>
            <div class="document-actions">
                <button class="btn btn-secondary btn-preview" data-id="${doc.id}">
                    <i class="fas fa-eye"></i> ${t.previewBtn}
                </button>
                <a href="${docPath}" download="${fileNameForDownload}" class="btn btn-primary btn-download">
                    <i class="fas fa-download"></i> ${t.downloadBtn}
                </a>
            </div>
        `;

        // Add event listener for preview button
        card.querySelector('.btn-preview').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(doc.id);
        });

        // Add event listener for download button to track downloads
        card.querySelector('.btn-download').addEventListener('click', (e) => {
            showNotification(`${t.downloadBtn}: ${doc.title}`, 'success');
        });

        return card;
    }

    function renderNoDocuments() {
        const t = translations[currentLanguage];
        documentList.innerHTML = `
            <div class="no-documents">
                <i class="fas fa-file-circle-xmark"></i>
                <h4>${t.noDocuments}</h4>
                <p>${t.noDocumentsHelp}</p>
            </div>
        `;
    }

    function renderPagination(totalPages, currentPage) {
        pagination.innerHTML = '';
        if (totalPages <= 1) return;

        const t = translations[currentLanguage];

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = `<i class="fas fa-chevron-left"></i>`;
        prevBtn.disabled = (currentPage === 1);
        if (currentPage > 1) {
            prevBtn.addEventListener('click', () => renderPage(currentPage - 1));
        }
        pagination.appendChild(prevBtn);

        // Page numbers
        const pagesToShow = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
        let lastPage = 0;

        for (let i = 1; i <= totalPages; i++) {
            if (pagesToShow.has(i) && i > 0 && i <= totalPages) {
                if (lastPage > 0 && i - lastPage > 1) {
                    const dots = document.createElement('span');
                    dots.textContent = '...';
                    dots.className = 'pagination-dots';
                    pagination.appendChild(dots);
                }

                const pageBtn = document.createElement('button');
                pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => renderPage(i));
                pagination.appendChild(pageBtn);
                lastPage = i;
            }
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = `<i class="fas fa-chevron-right"></i>`;
        nextBtn.disabled = (currentPage === totalPages);
        if (currentPage < totalPages) {
            nextBtn.addEventListener('click', () => renderPage(currentPage + 1));
        }
        pagination.appendChild(nextBtn);
    }

    // --- 12. MODAL FUNCTIONS ---
    function openModal(docId) {
        // Search in all documents to be safe
        const doc = allDocuments.find(d => d.id === docId);

        if (!doc) {
            showNotification('Document not found', 'error');
            return;
        }

        // Navigation should ideally be based on the list you clicked from
        currentPreviewIndex = mainFilteredDocuments.findIndex(d => d.id === docId);
        // If not found in filtered documents, search in all documents
        if (currentPreviewIndex === -1) {
            currentPreviewIndex = allDocuments.findIndex(d => d.id === docId);
        }

        // Use the helper function to get the correct path
        const pdfPath = getDocumentPath(doc);
        const fileNameForDownload = getFileNameForDownload(doc);

        modalTitle.textContent = doc.title;
        
        // Show loading state
        pdfViewer.innerHTML = `
            <div class="pdf-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>${translations[currentLanguage].loadingPdf}</p>
            </div>
        `;
        
        // Set up error handling
        const iframe = document.createElement('iframe');
        iframe.id = 'pdf-iframe';
        iframe.src = pdfPath + '#toolbar=1&navpanes=1&scrollbar=1';
        iframe.onload = () => {
            pdfViewer.innerHTML = '';
            pdfViewer.appendChild(iframe);
        };
        iframe.onerror = () => {
            pdfViewer.innerHTML = `
                <div class="pdf-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${translations[currentLanguage].pdfLoadError}</p>
                    <a href="${pdfPath}" download="${fileNameForDownload}" class="btn btn-primary">
                        <i class="fas fa-download"></i> ${translations[currentLanguage].downloadInstead}
                    </a>
                </div>
            `;
            showNotification('Failed to load PDF. Try downloading instead.', 'error');
        };

        // Set download link
        modalDownload.href = pdfPath;
        modalDownload.download = fileNameForDownload;

        // Update navigation buttons
        updateModalNavigation();

        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';

        // Show loading state notification
        showNotification(`Loading: ${doc.title}`, 'info');
    }

    function openLessonModal(lesson) {
        // Set the current preview index to -1 to disable navigation for lessons
        currentPreviewIndex = -1;

        modalTitle.textContent = lesson.title;
        
        // Show loading state
        pdfViewer.innerHTML = `
            <div class="pdf-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>${translations[currentLanguage].loadingPdf}</p>
            </div>
        `;
        
        // Set up error handling
        const iframe = document.createElement('iframe');
        iframe.id = 'pdf-iframe';
        iframe.src = lesson.pdfUrl + '#toolbar=1&navpanes=1&scrollbar=1';
        iframe.onload = () => {
            pdfViewer.innerHTML = '';
            pdfViewer.appendChild(iframe);
        };
        iframe.onerror = () => {
            pdfViewer.innerHTML = `
                <div class="pdf-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${translations[currentLanguage].pdfLoadError}</p>
                    <a href="${lesson.pdfUrl}" download="${lesson.title}.pdf" class="btn btn-primary">
                        <i class="fas fa-download"></i> ${translations[currentLanguage].downloadInstead}
                    </a>
                </div>
            `;
            showNotification('Failed to load lesson PDF. Try downloading instead.', 'error');
        };

        // Set download link
        modalDownload.href = lesson.pdfUrl;
        modalDownload.download = `${lesson.title}.pdf`;

        // Update navigation buttons (disable them for lessons)
        updateModalNavigation();

        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';

        // Show loading state notification
        showNotification(`Loading: ${lesson.title}`, 'info');
    }

    function closeModal() {
        modal.classList.remove('visible');
        pdfViewer.innerHTML = '';
        document.body.style.overflow = '';
        currentPreviewIndex = -1;
    }

    function showPrevDocument() {
        if (currentPreviewIndex > 0) {
            const prevDoc = mainFilteredDocuments[currentPreviewIndex - 1];
            if (prevDoc) {
                openModal(prevDoc.id);
            }
        }
    }

    function showNextDocument() {
        if (currentPreviewIndex < mainFilteredDocuments.length - 1) {
            const nextDoc = mainFilteredDocuments[currentPreviewIndex + 1];
            if (nextDoc) {
                openModal(nextDoc.id);
            }
        }
    }

    function updateModalNavigation() {
        const t = translations[currentLanguage];

        if (currentPreviewIndex === -1) {
            // This is a lesson, disable navigation
            modalPrev.disabled = true;
            modalNext.disabled = true;
            modalPrev.style.opacity = '0.5';
            modalNext.style.opacity = '0.5';
        } else {
            // This is a regular document
            modalPrev.disabled = currentPreviewIndex === 0;
            modalNext.disabled = currentPreviewIndex === mainFilteredDocuments.length - 1;
            modalPrev.style.opacity = modalPrev.disabled ? '0.5' : '1';
            modalNext.style.opacity = modalNext.disabled ? '0.5' : '1';
        }

        // Update button text
        modalPrev.innerHTML = `<i class="fas fa-arrow-left"></i> ${t.prevBtn}`;
        modalNext.innerHTML = `${t.nextBtn} <i class="fas fa-arrow-right"></i>`;
    }

    // --- 13. LANGUAGE/TRANSLATION ---
    function updateLanguage() {
        const t = translations[currentLanguage];

        // Update all elements with data-key
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

        // Update quarter pills
        document.querySelectorAll('.quarter-pill').forEach((pill, index) => {
            const quarter = index + 1;
            if (t[`q${quarter}`]) {
                pill.textContent = t[`q${quarter}`];
            }
        });

        // Update document title
        document.title = t.siteTitle;

        // Update navigation items
        updateNavigationText();

        // Update document count
        const count = mainFilteredDocuments.length;
        docCount.textContent = `${count} ${t.docCount}`;
    }

    function updateNavigationText() {
        const t = translations[currentLanguage];

        // Update navigation text while preserving icons
        const navItems = [
            { element: navHome, text: t.navHome },
            { element: navWatchOnline, text: t.navWatchOnline },
            { element: navAboutUs, text: t.navAboutUs },
            { element: navArchives, text: t.navArchives },
            { element: navContact, text: t.navContact }
        ];

        navItems.forEach(item => {
            if (item.element) {
                const icon = item.element.querySelector('i');
                if (icon) {
                    const iconClone = icon.cloneNode(true);
                    item.element.innerHTML = '';
                    item.element.appendChild(iconClone);
                    item.element.appendChild(document.createTextNode(` ${item.text}`));
                }
            }
        });
    }

    // --- 14. NOTIFICATION SYSTEM ---
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    function getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || '#3b82f6';
    }

    // --- 15. HAMBURGER MENU ---
    function setupHamburgerMenu() {
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

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('nav.main-nav') && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    }

    // --- 16. LOAD PREFERENCES AND START APP ---
    function loadPreferences() {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && ['en', 'sw', 'rw'].includes(savedLanguage)) {
            currentLanguage = savedLanguage;
            languageSelect.value = currentLanguage;
        }

        // Set current quarter based on current date
        const now = new Date();
        const month = now.getMonth() + 1; // getMonth() is 0-indexed

        if (month >= 1 && month <= 3) {
            currentQuarter = '1';
        } else if (month >= 4 && month <= 6) {
            currentQuarter = '2';
        } else if (month >= 7 && month <= 9) {
            currentQuarter = '3';
        } else {
            currentQuarter = '4';
        }
    }

    // --- 17. ADMIN FUNCTIONS FOR UPDATING LESSONS ---
    window.updateBibleLesson = function (quarter, lessonId, lessonData) {
        if (!bibleLessons[quarter]) {
            console.error(`Invalid quarter: ${quarter}`);
            return false;
        }

        // Find the lesson by ID
        const lessonIndex = bibleLessons[quarter].lessons.findIndex(lesson => lesson.id === lessonId);

        if (lessonIndex !== -1) {
            // Update existing lesson
            bibleLessons[quarter].lessons[lessonIndex] = { ...bibleLessons[quarter].lessons[lessonIndex], ...lessonData };
        } else {
            // Add new lesson
            bibleLessons[quarter].lessons.push({ id: lessonId, ...lessonData });
        }

        // Mark the quarter as available
        bibleLessons[quarter].available = true;

        // Refresh the lessons sidebar if this quarter is currently selected
        if (currentQuarter === quarter.toString()) {
            handleLessonFilterChange();
        }

        // Save to localStorage for persistence
        localStorage.setItem(`bibleLessons_${quarter}`, JSON.stringify(bibleLessons[quarter]));

        return true;
    };

    window.addBibleLesson = function (quarter, lessonData) {
        if (!bibleLessons[quarter]) {
            console.error(`Invalid quarter: ${quarter}`);
            return false;
        }

        // Generate a unique ID if not provided
        if (!lessonData.id) {
            const existingIds = bibleLessons[quarter].lessons.map(lesson => lesson.id);
            let newId = `q${quarter}-${bibleLessons[quarter].lessons.length + 1}`;
            while (existingIds.includes(newId)) {
                newId = `q${quarter}-${parseInt(newId.split('-')[1]) + 1}`;
            }
            lessonData.id = newId;
        }

        // Add the lesson
        bibleLessons[quarter].lessons.push(lessonData);

        // Mark the quarter as available
        bibleLessons[quarter].available = true;

        // Refresh the lessons sidebar if this quarter is currently selected
        if (currentQuarter === quarter.toString()) {
            handleLessonFilterChange();
        }

        // Save to localStorage for persistence
        localStorage.setItem(`bibleLessons_${quarter}`, JSON.stringify(bibleLessons[quarter]));

        return lessonData.id;
    };

    window.removeBibleLesson = function (quarter, lessonId) {
        if (!bibleLessons[quarter]) {
            console.error(`Invalid quarter: ${quarter}`);
            return false;
        }

        // Find and remove the lesson
        const lessonIndex = bibleLessons[quarter].lessons.findIndex(lesson => lesson.id === lessonId);

        if (lessonIndex !== -1) {
            bibleLessons[quarter].lessons.splice(lessonIndex, 1);

            // Refresh the lessons sidebar if this quarter is currently selected
            if (currentQuarter === quarter.toString()) {
                handleLessonFilterChange();
            }

            // Save to localStorage for persistence
            localStorage.setItem(`bibleLessons_${quarter}`, JSON.stringify(bibleLessons[quarter]));

            return true;
        }

        return false;
    };

    // Load saved lessons from localStorage
    function loadSavedLessons() {
        for (let quarter = 1; quarter <= 4; quarter++) {
            const savedLessons = localStorage.getItem(`bibleLessons_${quarter}`);
            if (savedLessons) {
                try {
                    const parsed = JSON.parse(savedLessons);
                    bibleLessons[quarter] = { ...bibleLessons[quarter], ...parsed };
                } catch (e) {
                    console.error(`Error loading saved lessons for quarter ${quarter}:`, e);
                }
            }
        }
    }

    // Add CSS styles for notifications, PDF viewer, and lesson cards
    function addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .pdf-loading, .pdf-error {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: #666;
                text-align: center;
            }
            
            .pdf-loading i, .pdf-error i {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            
            .pdf-error {
                color: #dc3545;
            }
            
            .pdf-error .btn {
                margin-top: 1rem;
            }
            
            .fa-spinner.fa-spin {
                animation: fa-spin 1s infinite linear;
            }
            
            @keyframes fa-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .lesson-card {
                background: white;
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 1rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                border: 1px solid #eaeaea;
            }
            
            .lesson-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .lesson-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 0.5rem;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .lesson-title {
                margin: 0;
                font-size: 1.1rem;
                color: #333;
                flex: 1;
                min-width: 200px;
            }
            
            .lesson-date {
                font-size: 0.8rem;
                color: #666;
                background: #f0f0f0;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
                white-space: nowrap;
            }
            
            .lesson-description {
                margin: 0.5rem 0;
                color: #555;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .lesson-memory-verse {
                margin: 0.5rem 0;
                padding: 0.5rem;
                background: #f9f9f9;
                border-left: 3px solid #1a2b6d;
                font-size: 0.85rem;
                color: #444;
                font-style: italic;
                line-height: 1.4;
            }
            
            .lesson-actions {
                display: flex;
                gap: 0.5rem;
                margin-top: 0.5rem;
                flex-wrap: wrap;
            }
            
            .quarter-title {
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 1rem;
                color: #1a2b6d;
                text-align: center;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid #1a2b6d;
            }
            
            .coming-soon {
                text-align: center;
                padding: 2rem 1rem;
                color: #666;
                background: #f9f9f9;
                border-radius: 8px;
                margin-top: 1rem;
            }
            
            .coming-soon i {
                font-size: 3rem;
                margin-bottom: 1rem;
                color: #ddd;
            }
            
            .coming-soon h4 {
                margin-bottom: 0.5rem;
                color: #444;
            }
            
            .no-results-sidebar {
                text-align: center;
                padding: 2rem 1rem;
                color: #666;
                background: #f9f9f9;
                border-radius: 8px;
                margin-top: 1rem;
            }
            
            .no-results-sidebar i {
                font-size: 2rem;
                margin-bottom: 1rem;
                color: #ccc;
            }
            
            .pagination-btn.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .pagination-btn.active {
                background-color: #1a2b6d;
                color: white;
            }
            
            .document-card {
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            
            .document-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            @media (max-width: 768px) {
                .lesson-header {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .lesson-date {
                    align-self: flex-start;
                }
                
                .lesson-actions {
                    flex-direction: column;
                }
                
                .lesson-actions .btn {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Start the application
    addCustomStyles();
    loadPreferences();
    loadSavedLessons();
    init();
});
