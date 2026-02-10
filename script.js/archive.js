document.addEventListener('DOMContentLoaded', () => {
    // --- 1. STATE AND CONSTANTS ---
    const ITEMS_PER_PAGE = 9;
    let allDocuments = [];
    let mainFilteredDocuments = [];
    let lessonFilteredDocuments = [];
    let currentPage = 1;
    let currentLanguage = 'en';
    let currentPreviewIndex = 0;
    let currentQuarter = '1';

    // --- 2. TRANSLATIONS WITH NAVIGATION SUPPORT ---
    const translations = {
        en: {
            siteTitle: "PDF Archive",
            heroTitle: "Explore Our Document Collection",
            heroSubtitle: "Browse, preview, and download from our extensive library.",
            searchPlaceholder: "Search documents by title or category...",
            categoriesTitle: "Categories",
            documentsTitle: "Documents",
            footerText: "© 2025 PDF Archive. All rights reserved.",
            downloadBtn: "Download",
            previewBtn: "Preview",
            allCategories: "All Categories",
            docCount: "documents",
            noDocuments: "No Documents Found",
            noDocumentsHelp: "Try adjusting your search or filter criteria.",
            prevBtn: "Previous",
            nextBtn: "Next",
            page: "Page",
            // Navigation translations
            navHome: "Home",
            navWatchOnline: "Watch Online",
            navAboutUs: "About Us",
            navArchives: "Archives",
            navContact: "Contact",
            // Bible lesson translations
            bibleLessons: "Bible Lessons",
            searchLessons: "Search lessons...",
            noLessons: "No lessons found for this quarter.",
            memoryVerse: "Memory Verse",
            viewLesson: "View Lesson",
            comingSoon: "Coming Soon",
            lessonNotAvailable: "Lessons for this quarter will be available soon."
        },
        sw: {
            siteTitle: "Kumbukumbu ya PDF",
            heroTitle: "Gundua Mkusanyiko Wetu wa Nyaraka",
            heroSubtitle: "Vinjari, hakiki, na pakua kutoka kwa maktaba yetu pana.",
            searchPlaceholder: "Tafuta nyaraka kwa jina au kategoria...",
            categoriesTitle: "Kategoria",
            documentsTitle: "Nyaraka",
            footerText: "© 2025 Kumbukumbu ya PDF. Haki zote zimehifadhiwa.",
            downloadBtn: "Pakua",
            previewBtn: "Hakiki",
            allCategories: "Kategoria Zote",
            docCount: "nyaraka",
            noDocuments: "Hakuna Nyaraka Zilizopatikana",
            noDocumentsHelp: "Jaribu kurekebisha utafutaji au kichujio chako.",
            prevBtn: "Iliyotangulia",
            nextBtn: "Inayofuata",
            page: "Ukurasa",
            // Navigation translations
            navHome: "Nyumbani",
            navWatchOnline: "Tazama Mtandaoni",
            navAboutUs: "Kuhusu Sisi",
            navArchives: "Kumbukumbu",
            navContact: "Wasiliana",
            // Bible lesson translations
            bibleLessons: "Masomo ya Biblia",
            searchLessons: "Tafuta masomo...",
            noLessons: "Hakuna masomo yaliyopatikana kwa robo hii.",
            memoryVerse: "Sura ya Kumbukumbu",
            viewLesson: "Tazama Somo",
            comingSoon: "Inakuja Hivi Karibuni",
            lessonNotAvailable: "Masomo kwa robo hii yatapatikana hivi karibuni."
        },
        rw: {
            siteTitle: "Ububiko bwa PDF",
            heroTitle: "Shakisha Itsinda ry'Inyandiko Zacu",
            heroSubtitle: "Rondora, urebe mbere, kandi ukuremo amakuru mu bubiko bwacu bwagutse.",
            searchPlaceholder: "Shakisha inyandiko ku mutwe cyangwa icyiciro...",
            categoriesTitle: "Ibyiciro",
            documentsTitle: "Inyandiko",
            footerText: "© 2025 Ububiko bwa PDF. Amahoro yose arinda.",
            downloadBtn: "Kuramo",
            previewBtn: "Reba mbere",
            allCategories: "Ibyiciro Byose",
            docCount: "inyandiko",
            noDocuments: "Nta Nyandiko Zabonetse",
            noDocumentsHelp: "Gerageza guhindura ushakisha cyangwa ibisanzwe.",
            prevBtn: "Ibanjirije",
            nextBtn: "Ikurikira",
            page: "Urupapuro",
            // Navigation translations
            navHome: "Ahabanza",
            navWatchOnline: "Reba kuri interineti",
            navAboutUs: "Twebwe",
            navArchives: "Ububiko",
            navContact: "Twandikire",
            // Bible lesson translations
            bibleLessons: "Amasomo y'ibitabo",
            searchLessons: "Shakisha amasomo...",
            noLessons: "Nta masomo yabonetse muri iyi gahunda.",
            memoryVerse: "Umugani wo kumibwa",
            viewLesson: "Reba Somo",
            comingSoon: "Uza Hivi Karibuni",
            lessonNotAvailable: "Amasomo muri iyi gahunda azaba hivi karibuni."
        }
    };

    // --- 3. BIBLE LESSONS DATA ---
    // This structure allows you to easily update lessons for each quarter
    // Simply add or modify lessons in the appropriate quarter array
    const bibleLessons = {
        1: { // Q1 (January - March)
            title: "First Quarter 2026",
            available: true,
            lessons: [
                {
                    id: "q1-1",
                    title: "First Quarter Lesson 2026",
                    date: "January - March 2026",
                    description: "Quarterly Bible study lessons for spiritual growth and understanding.",
                    memoryVerse: "Study to shew thyself approved unto God - 2 Timothy 2:15",
                    pdfUrl: "lessons/Lesson 1st quarter 2026- FINAL.pdf"
                }
            ]
        },
        2: { // Q2 (April - June)
            title: "Second Quarter 2026",
            available: false,
            lessons: []
        },
        3: { // Q3 (July - September)
            title: "Third Quarter 2026",
            available: false,
            lessons: []
        },
        4: { // Q4 (October - December)
            title: "Fourth Quarter 2026",
            available: false,
            lessons: []
        }
    };

    // --- 4. HELPER FUNCTION TO GET CORRECT DOCUMENT PATH ---
    function getDocumentPath(doc) {
        // Check if the fileName already includes a folder path
        if (doc.fileName && doc.fileName.includes('/')) {
            return doc.fileName; // Already has the correct path (e.g., "tracks/filename.pdf" or "judah/filename.pdf")
        } else if (doc.pdfUrl) {
            return doc.pdfUrl; // For Bible lessons
        } else {
            return `pdfs/${doc.fileName}`; // Add pdfs/ prefix for Books
        }
    }

    // --- 5. YOUR REAL DOCUMENT DATA ---
    function getDocumentData() {
        return [
            // BOOKS - PDFs in the pdfs folder
            { id: 1, title: "Babylon Mystery Religion", category: "Books", fileName: "Babylon-Mystery-Religion-by-Ralph-Woodrow-1981.pdf" },
            { id: 2, title: "Complete Jewish Bible", category: "Books", fileName: "Complete-Jewish-Bible.pdf" },
            { id: 3, title: "Dugger Porter Debate", category: "Books", fileName: "Dugger-Porter-Debate.pdf" },
            { id: 4, title: "Fox's Book of Martyrs", category: "Books", fileName: "FOXs-BOOK-of-MARTYRS.pdf" },
            { id: 5, title: "Forty Points of Doctrine", category: "Books", fileName: "FortyPointsOfDoctrine.pdf" },
            { id: 6, title: "The Bible Home Instructor", category: "Books", fileName: "THE-BIBLE-HOME-INSTRUCTOR.pdf" },
            { id: 7, title: "The Two Babylons", category: "Books", fileName: "The-Two-Babylons.pdf" },
            { id: 8, title: "A History of the True Church", category: "Books", fileName: "A-History-of-the-True-Church-Dugger-and-Dodd.pdf" },

            // TRACTS - PDFs in the tracks folder
            { id: 9, title: "Beginning and Ending of God's Day", category: "Tracts", fileName: "tracks/Beginning_and_Ending_of_Gods_Day.pdf" },
            { id: 10, title: "Biblical Doctrine of Predestination", category: "Tracts", fileName: "tracks/Biblical-Doctrine-of-Predestination.pdf" },
            { id: 11, title: "Coming Home", category: "Tracts", fileName: "tracks/Coming-Home.pdf" },
            { id: 12, title: "Crises Dates in Bible Prophecy", category: "Tracts", fileName: "tracks/Crises-Dates-in-Bible-Prophecy.pdf" },
            { id: 13, title: "Daniel", category: "Tracts", fileName: "tracks/DANIEL.pdf" },
            { id: 14, title: "Death in the Kitchen", category: "Tracts", fileName: "tracks/Death-in-the-Kitchen.pdf" },
            { id: 15, title: "Deliverance from Plagues", category: "Tracts", fileName: "tracks/Deliverance-from-plaques-is-knowing-his-number.pdf" },
            { id: 16, title: "Doctrine and History of the True Religion", category: "Tracts", fileName: "tracks/Doctrine-and-History-of-the-True-Religion.pdf" },
            { id: 17, title: "Doctrine and History of the Primitive Church", category: "Tracts", fileName: "tracks/Doctrine-and-history-of-the-primitive-church.pdf" },
            { id: 18, title: "Does It Make Difference", category: "Tracts", fileName: "tracks/Does-it-make-difference.pdf" },
            { id: 19, title: "Does the Bible Contradict Itself", category: "Tracts", fileName: "tracks/Does-the-Bible-Contradict-Itself.pdf" },
            { id: 20, title: "Easter, Christmas And Sunday Were Pagan", category: "Tracts", fileName: "tracks/Easter-Christmas-And-Sunday-Were-Pagan.pdf" },
            { id: 21, title: "Explanation of Common Texts Against the Bible Sabbath", category: "Tracts", fileName: "tracks/Explanation-of-common-texts-used-against-the-Bible-Sabbath.pdf" },
            { id: 22, title: "Forty Reasons Why The 7th Day Sabbath Should Be Kept", category: "Tracts", fileName: "tracks/Forty-Reasons-Why-The-7th-Day-Sabbath-Should-Be-Kept.pdf" },
            { id: 23, title: "Hell - What and Where is it", category: "Tracts", fileName: "tracks/Hell-What-and-Where-is-it.pdf" },
            { id: 24, title: "How Old is Your Church", category: "Tracts", fileName: "tracks/How-old-is-your-Church.pdf" },
            { id: 25, title: "I Will Bless Them That Bless Thee", category: "Tracts", fileName: "tracks/I-will-Bless-Them-That-Bless-Thee.pdf" },
            { id: 26, title: "Israel 3", category: "Tracts", fileName: "tracks/Israel3.pdf" },
            { id: 27, title: "Israel's God - A Reality or a Myth", category: "Tracts", fileName: "tracks/Israels-God-a-Reality-or-a-Myth.pdf" },
            { id: 28, title: "Judah - Failure to Stand by Her Agreed Test", category: "Tracts", fileName: "tracks/Judah-Failure-to-Stand-by-Her-Agreed-Test-of-Over-1900-Years-Ago-But-many-are-now.pdf" },
            { id: 29, title: "Mt. Zion Reporter", category: "Tracts", fileName: "tracks/Mt-Zion-Reporter_AN-Dugger.pdf" },
            { id: 30, title: "Mt. Sinai Speaks Once More", category: "Tracts", fileName: "tracks/Mt.-Sinai-Speaks-Once-More.pdf" },
            { id: 31, title: "One Door for the Gentiles to Enter", category: "Tracts", fileName: "tracks/One-door-for-the-Gentiles-to-enter.pdf" },
            { id: 32, title: "Passover and Lord's Supper", category: "Tracts", fileName: "tracks/Passover_and_Lords_Supper.pdf" },
            { id: 33, title: "Punishment of the Wicked", category: "Tracts", fileName: "tracks/Punishment-of-the-wicked.pdf" },
            { id: 34, title: "Reasons Why Seven Last Plagues Are in the Future", category: "Tracts", fileName: "tracks/REASONS-WHY-SEVEN-LAST-PLAQUES-ARE-IN-THE-FUTURE.pdf" },
            { id: 35, title: "Revelation", category: "Tracts", fileName: "tracks/REVELATION.pdf" },
            { id: 36, title: "Search the Scriptures", category: "Tracts", fileName: "tracks/Search-the-scriptures.pdf" },
            { id: 37, title: "The Resurrection of Christ", category: "Tracts", fileName: "tracks/THE-RESURRECTION-OF-CHRIST.pdf" },
            { id: 38, title: "The Bible Name for the Church", category: "Tracts", fileName: "tracks/The-Bible-Name-for-the-Church.pdf" },
            { id: 39, title: "The Daughter of Jerusalem and the Daughter of Babylon", category: "Tracts", fileName: "tracks/The-Daughter-of-Jerusalem-and-the-Daughter-of-Babylon.pdf" },
            { id: 40, title: "The Greatest Discovery of the Age - Noah's Ark Found", category: "Tracts", fileName: "tracks/The-Greatest-Discovery-of-the-Age-Noahs-Ark-Found.pdf" },
            { id: 41, title: "The Greatest Miracle of the Age - The Re-birth of Israel", category: "Tracts", fileName: "tracks/The-Greatest-Miracle-of-the-Age-The-Re-birth-of-Israel.pdf" },
            { id: 42, title: "The Holy Spirit", category: "Tracts", fileName: "tracks/The-Holy-Spirit.pdf" },
            { id: 43, title: "The Law of the Spirit of Life", category: "Tracts", fileName: "tracks/The-Law-of-the-Spirit-of-Life.pdf" },
            { id: 44, title: "The Pending World Scourge - Daniel and Revelation", category: "Tracts", fileName: "tracks/The-Pending-World-Scourage-Daniel-and-Revelation.pdf" },
            { id: 45, title: "The Restoration of the Kingdom to Israel", category: "Tracts", fileName: "tracks/The-Restoration-of-the-Kingdom-to-Israel.pdf" },
            { id: 46, title: "The Ten Tribes of Israel - Not Lost but Found", category: "Tracts", fileName: "tracks/The-Ten-Tribes-of-Israel-Not-lost-hut-found.pdf" },
            { id: 47, title: "The End of the World", category: "Tracts", fileName: "tracks/The-end-of-the-world.pdf" },
            { id: 48, title: "The Eternal Abode of the Righteous", category: "Tracts", fileName: "tracks/The-eternal-abode-of-the-righteous.pdf" },
            { id: 49, title: "The Law of God versus Devil's Scrapbook", category: "Tracts", fileName: "tracks/The-law-of-God-versus-Devils-scrapbook.pdf" },
            { id: 50, title: "The Living Truth", category: "Tracts", fileName: "tracks/The-living-Truth.pdf" },
            { id: 51, title: "The Mirror of God", category: "Tracts", fileName: "tracks/The-mirror-of-God.pdf" },
            { id: 52, title: "Why I Am Not a Seventh Day Adventist", category: "Tracts", fileName: "tracks/WHY-I-AM-NOT-A-SEVENTH-DAY-ADVENTIST.pdf" },
            { id: 53, title: "Was Man Created", category: "Tracts", fileName: "tracks/Was-Man-Created.pdf" },
            { id: 54, title: "Was Peter the Foundation Rock", category: "Tracts", fileName: "tracks/Was-Peter-the-Foundation-Rock.pdf" },
            { id: 55, title: "What Is the Real Baptism Doctrine", category: "Tracts", fileName: "tracks/What-Is-the-Real-Baptism-Doctrine.pdf" },
            { id: 56, title: "What Was Abolished By Christ", category: "Tracts", fileName: "tracks/What-Was-Abolished-By-Christ.pdf" },
            { id: 57, title: "Which Day is The Sabbath", category: "Tracts", fileName: "tracks/Which-Day-is-The-Sabbath.pdf" },
            { id: 58, title: "Who Are The Messianic Jews In Israel", category: "Tracts", fileName: "tracks/Who-Are-The-Messianic-Jews-In-Israel.pdf" },
            { id: 59, title: "Why Not Talk to God About Sabbath", category: "Tracts", fileName: "tracks/Why-not-talk-to-God-about-Sabbath.pdf" },
            { id: 60, title: "Has Our Messiah Come", category: "Tracts", fileName: "tracks/has-our-messiah-come-better.pdf" },
            { id: 61, title: "Why Israel is Here to Stay", category: "Tracts", fileName: "tracks/why-israel-is-here-to-stay-potrait.pdf" },
            { id: 62, title: "Year of Deception", category: "Tracts", fileName: "tracks/year of deception.pdf" },

            // JUDAH - PDFs in the judah folder
            { id: 63, title: "Judah/72-sebat", category: "Judah", fileName: "judah/72-Sebat.pdf" },
            { id: 64, title: "Judah/78 Tebet", category: "Judah", fileName: "judah/78-Tibet.pdf" },
            { id: 65, title: "Judah/96 Nov", category: "Judah", fileName: "judah/96-Nov.pdf" },
            { id: 66, title: "Judah/98 july", category: "Judah", fileName: "judah/98-July.pdf" },
            // Removed duplicate ID 67
            { id: 68, title: "Judah/91 Sept", category: "Judah", fileName: "judah/91-Sept.pdf" },
            { id: 69, title: "Judah/83 Tebet", category: "Judah", fileName: "judah/83-Tibet.pdf" },
            { id: 70, title: "Judah/94 Dec", category: "Judah", fileName: "judah/94-Dec.pdf" },
            { id: 71, title: "Judah/80 Tebet", category: "Judah", fileName: "judah/80-Tebet.pdf" },
            { id: 72, title: "Judah/81 Elul", category: "Judah", fileName: "judah/81-Elul.pdf" },
            { id: 73, title: "Judah/90 Alul", category: "Judah", fileName: "judah/90-Alul.pdf" },
            { id: 74, title: "Judah/89 Bul", category: "Judah", fileName: "judah/89-Bul.pdf" },
            { id: 75, title: "Judah/81 Bul", category: "Judah", fileName: "judah/81-Bul.pdf" },
            { id: 76, title: "Judah/79 Sivan", category: "Judah", fileName: "judah/79-Sivan.pdf" },
            { id: 77, title: "Judah 71 Tebet", category: "Judah", fileName: "judah/71-Tebet.pdf" },
            { id: 78, title: "Judah/87 Zif", category: "Judah", fileName: "judah/87-Zif.pdf" },
            { id: 79, title: "Judah/85 July", category: "Judah", fileName: "judah/85-July.pdf" },
            { id: 80, title: "Judah/84 Chisleu", category: "Judah", fileName: "judah/84-Chisleu.pdf" },
            { id: 81, title: "Judah/83 July", category: "Judah", fileName: "judah/83-July.pdf" },
            { id: 82, title: "Judah/78 Elul", category: "Judah", fileName: "judah/78-Elul.pdf" },
            { id: 83, title: "Judah/79 Bul", category: "Judah", fileName: "judah/79-Bul.pdf" },
            { id: 84, title: "Judah/80 Elul", category: "Judah", fileName: "judah/80-Elul.pdf" },
            { id: 85, title: "Judah/81 sivan", category: "Judah", fileName: "judah/81-Sivan.pdf" },
            { id: 86, title: "Judah/82 Bul-chisleu", category: "Judah", fileName: "judah/82-Bul-Chisleu.pdf" },
            { id: 87, title: "Judah/82 Elul", category: "Judah", fileName: "judah/82-Elul.pdf" },
            { id: 88, title: "Judah/88 Sivan", category: "Judah", fileName: "judah/88-Sivan.pdf" },
            { id: 89, title: "Judah/82 NovDec", category: "Judah", fileName: "judah/Judah-82-NovDec.pdf" },
            { id: 90, title: "Judah/86 Aug", category: "Judah", fileName: "judah/Judah-86Aug.pdf" },
            { id: 91, title: "Judah/91", category: "Judah", fileName: "judah/Judah-91.pdf" },
            { id: 92, title: "Judah/Feb 1970", category: "Judah", fileName: "judah/Feb-1970.pdf" },
            { id: 93, title: "Judah/Jan-Feb-1977", category: "Judah", fileName: "judah/Jan-Feb-1977.pdf" },
            { id: 94, title: "Judah/Jan 1974", category: "Judah", fileName: "judah/Jan-1974.pdf" },
            { id: 95, title: "Judah/Jan-1971", category: "Judah", fileName: "judah/Jan-1971.pdf" },
            { id: 96, title: "Judah/July-1970", category: "Judah", fileName: "judah/July-1970.pdf" },
            { id: 97, title: "Judah/Dec-1974", category: "Judah", fileName: "judah/Judah-Dec-1974.pdf" },
            { id: 98, title: "Judah/June 1974", category: "Judah", fileName: "judah/Judah-June-1974.pdf" },
            { id: 99, title: "Judah/July 1974", category: "Judah", fileName: "judah/Judah-July-1974.pdf" },
            { id: 100, title: "Judah/Octomber 1971", category: "Judah", fileName: "judah/Judah-Oct-1971.pdf" },
            { id: 101, title: "Judah/Sept 1974", category: "Judah", fileName: "judah/Judah-Sep-1974.pdf" },
            { id: 102, title: "Judah/Sept 1956", category: "Judah", fileName: "judah/MZR1956Sept.pdf" },
            { id: 103, title: "Judah/82 Nisan", category: "Judah", fileName: "judah/82-Nisan.pdf" },
            { id: 104, title: "Judah/july 80", category: "Judah", fileName: "judah/80-July.pdf" },
            { id: 105, title: "Judah/83 Elul", category: "Judah", fileName: "judah/83-Elul.pdf" },
            { id: 106, title: "Judah/98 Nov", category: "Judah", fileName: "judah/98-Nov.pdf" },
            // Removed duplicate ID 107
            { id: 108, title: "Judah/96-August", category: "Judah", fileName: "judah/96-Aug.pdf" },
            { id: 109, title: "Judah/88-Bul", category: "Judah", fileName: "judah/88-Bul.pdf" },
            { id: 110, title: "Judah/85-Chisleu", category: "Judah", fileName: "judah/85-Chesleu.pdf" },
            { id: 111, title: "Judah/73-July", category: "Judah", fileName: "judah/73-July.pdf" },
            { id: 112, title: "Judah/81-chisleu", category: "Judah", fileName: "judah/81-Chesleu.pdf" },
            { id: 113, title: "Judah/97-March", category: "Judah", fileName: "judah/97-March.pdf" },
            { id: 114, title: "Judah/91- May", category: "Judah", fileName: "judah/91-May.pdf" },
            { id: 115, title: "Judah/81-July", category: "Judah", fileName: "judah/81-July.pdf" },
            { id: 116, title: "Judah/79-Zif", category: "Judah", fileName: "judah/79-Zif.pdf" },
            { id: 117, title: "Judah/79-Ethanim", category: "Judah", fileName: "judah/79-Ethanim.pdf" },
            { id: 118, title: "Judah/81-August", category: "Judah", fileName: "judah/81-August.pdf" },
            { id: 119, title: "Judah/77-August", category: "Judah", fileName: "judah/77-August.pdf" },
            { id: 120, title: "Judah/73-Zif", category: "Judah", fileName: "judah/73-Zif.pdf" },
            { id: 121, title: "Judah/Zif-Sivan", category: "Judah", fileName: "judah/77-Zif-Sivan.pdf" },
            { id: 122, title: "Judah/72-July", category: "Judah", fileName: "judah/72-July.pdf" },
            { id: 123, title: "Judah/89-August", category: "Judah", fileName: "judah/89-August.pdf" },
            { id: 124, title: "Judah/93-May", category: "Judah", fileName: "judah/93-May.pdf" },
            { id: 125, title: "Judah/73-bul", category: "Judah", fileName: "judah/73-Bul.pdf" },
            { id: 126, title: "Judah/73-chisleu", category: "Judah", fileName: "judah/73-Chisleu.pdf" },
            { id: 127, title: "Judah/72-Elul", category: "Judah", fileName: "judah/72-Elul.pdf" },
            { id: 128, title: "Judah/82-Ethanim", category: "Judah", fileName: "judah/82-Ethanim.pdf" },
            { id: 129, title: "Judah/MZR2008-Q2", category: "Judah", fileName: "judah/MZR2008-Q2.pdf" },
            { id: 130, title: "Judah/95MarchApr", category: "Judah", fileName: "judah/Judah-95MarApr.pdf" },
            { id: 131, title: "Judah/90", category: "Judah", fileName: "judah/Judah-90.pdf" },
            { id: 132, title: "Judah/July-1987", category: "Judah", fileName: "judah/July-1987.pdf" },
            { id: 133, title: "Judah/June-1974", category: "Judah", fileName: "judah/June-1972.pdf" },
            { id: 134, title: "Judah/March-1974", category: "Judah", fileName: "judah/March-1974.pdf" },
            { id: 135, title: "Judah/May-1972", category: "Judah", fileName: "judah/May-1972.pdf" },
            { id: 136, title: "Judah/Nov-Bul-1959", category: "Judah", fileName: "judah/Nov-Bul-1959.pdf" },
            { id: 137, title: "Judah/June-1971", category: "Judah", fileName: "judah/Judah-June-1971.pdf" },
            { id: 138, title: "Judah/Octomber-1970", category: "Judah", fileName: "judah/Judah-Oct-1970.pdf" },
            { id: 139, title: "Judah/Feb-1971", category: "Judah", fileName: "judah/Judah-Feb-1971.pdf" },
            { id: 140, title: "Judah/May-1971", category: "Judah", fileName: "judah/Judah-May-1971.pdf" },
            { id: 141, title: "Judah/Dec-1974", category: "Judah", fileName: "judah/Judah-Dec-1974-2.pdf" },
            { id: 142, title: "Judah/1960-Bul-November", category: "Judah", fileName: "judah/Judah-1960-Bul-November.pdf" }
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
        // Load data
        allDocuments = getDocumentData();

        // Setup UI
        populateCategories();
        setupEventListeners();
        setupHamburgerMenu();

        // Initial render
        handleMainFilterChange();
        handleLessonFilterChange();
        updateLanguage();
    }

    // --- 9. EVENT LISTENERS ---
    function setupEventListeners() {
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            localStorage.setItem('preferredLanguage', currentLanguage);
            updateLanguage();
            renderPage(currentPage);
            renderLessonsSidebar();
            populateCategories();
        });

        mainSearchInput.addEventListener('input', handleMainFilterChange);
        categoryFilter.addEventListener('change', handleMainFilterChange);

        lessonSearchInput.addEventListener('input', handleLessonFilterChange);
        quarterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                quarterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentQuarter = pill.dataset.quarter;
                handleLessonFilterChange();
            });
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
    }

    // List of categories that should appear in the Lesson Sidebar
    // Admin: Add or remove category names here to move them between the grid and sidebar
    const lessonCategories = [
        'Judah Reports', 'Sep Reports', 'm.t zion report',
        'Date Reports', 'Elul pdf', 'Sebat pdf', 'Bul pdf',
        'Chisleu pdf', 'Zif pdf', 'Zif sivan pdf', 'Zif sivan 1 pdf',
        'Tibet pdf', 'Ethanim pdf', 'Sivan pdf', 'Tebet pdf',
        'Chesleu pdf', 'Bul-chisleu pdf', 'Nisan pdf', 'July pdf', 'March pdf', 'May pdf', 'sivan', 'sebat'
    ];

    function handleMainFilterChange() {
        const searchTerm = mainSearchInput.value.toLowerCase();
        const category = categoryFilter.value;

        mainFilteredDocuments = allDocuments.filter(doc => {
            // Rule: Lessons don't show up in the main grid unless explicitly filtered by category?
            // Actually, let's keep the grid for EVERYTHING non-lesson by default, 
            // but if they pick a lesson category from the filter, show it there too.
            const isLesson = lessonCategories.includes(doc.category);
            if (isLesson && category === 'all') return false;

            const titleMatch = doc.title.toLowerCase().includes(searchTerm);
            const categoryMatch = doc.category.toLowerCase().includes(searchTerm);
            const filterMatch = (category === 'all') || (doc.category === category);

            return (titleMatch || categoryMatch) && filterMatch;
        });

        currentPage = 1;
        renderPage(currentPage);
    }

    function handleLessonFilterChange() {
        const searchTerm = lessonSearchInput.value.toLowerCase();
        const quarter = bibleLessons[currentQuarter];

        // If the quarter is not available yet, show a message
        if (!quarter || !quarter.available) {
            renderComingSoonMessage();
            return;
        }

        // Filter lessons for the current quarter
        lessonFilteredDocuments = quarter.lessons.filter(lesson => {
            const titleMatch = lesson.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = lesson.description.toLowerCase().includes(searchTerm);
            return titleMatch || descriptionMatch;
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

    // --- 10. RENDERING FUNCTIONS ---
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
            return;
        }

        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const paginatedDocs = mainFilteredDocuments.slice(start, end);

        paginatedDocs.forEach(doc => {
            const card = createDocumentCard(doc);
            documentList.appendChild(card);
        });

        renderPagination(totalPages, page);
        updateLanguage();
    }

    function renderLessonsSidebar() {
        lessonList.innerHTML = '';

        if (lessonFilteredDocuments.length === 0) {
            lessonList.innerHTML = '<p class="no-results-sidebar">No lessons found.</p>';
            return;
        }

        // Add quarter title
        const quarterTitle = document.createElement('div');
        quarterTitle.className = 'quarter-title';
        quarterTitle.textContent = bibleLessons[currentQuarter].title;
        lessonList.appendChild(quarterTitle);

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
                    <button class="btn btn-secondary btn-view-lesson" data-lesson-id="${lesson.id}" data-pdf="${lesson.pdfUrl}">
                        <i class="fas fa-eye"></i> ${translations[currentLanguage].viewLesson}
                    </button>
                    <a href="${lesson.pdfUrl}" download class="btn btn-primary btn-download-lesson">
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
                <a href="${docPath}" download="${doc.fileName || doc.title}" class="btn btn-primary btn-download">
                    <i class="fas fa-download"></i> ${t.downloadBtn}
                </a>
            </div>
        `;

        // Add event listener for preview button
        card.querySelector('.btn-preview').addEventListener('click', (e) => {
            e.preventDefault();
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
        prevBtn.addEventListener('click', () => renderPage(currentPage - 1));
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
        nextBtn.addEventListener('click', () => renderPage(currentPage + 1));
        pagination.appendChild(nextBtn);
    }

    // --- 11. MODAL FUNCTIONS (FIXED PDF VIEWING) ---
    function openModal(docId) {
        // Search in all documents to be safe
        const doc = allDocuments.find(d => d.id === docId);

        // Navigation should ideally be based on the list you clicked from, 
        // but to keep it simple, we'll navigate through allDocuments for now
        currentPreviewIndex = allDocuments.findIndex(d => d.id === docId);

        if (!doc) return;

        // Use the helper function to get the correct path
        const pdfPath = getDocumentPath(doc);

        modalTitle.textContent = doc.title;
        pdfViewer.src = pdfPath + '#toolbar=1&navpanes=1&scrollbar=1';

        // Set download link
        modalDownload.href = pdfPath;
        modalDownload.download = doc.fileName || doc.title;

        // Update navigation buttons
        updateModalNavigation();

        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';

        // Show loading state
        showNotification(`Loading: ${doc.title}`, 'info');
    }

    function openLessonModal(lesson) {
        // Create a temporary document object for the lesson
        const lessonDoc = {
            id: lesson.id,
            title: lesson.title,
            pdfUrl: lesson.pdfUrl
        };

        // Set the current preview index to -1 to disable navigation
        currentPreviewIndex = -1;

        // Use the helper function to get the correct path
        const pdfPath = getDocumentPath(lessonDoc);

        modalTitle.textContent = lesson.title;
        pdfViewer.src = pdfPath + '#toolbar=1&navpanes=1&scrollbar=1';

        // Set download link
        modalDownload.href = pdfPath;
        modalDownload.download = lesson.title;

        // Update navigation buttons (disable them for lessons)
        modalPrev.disabled = true;
        modalNext.disabled = true;
        modalPrev.style.opacity = '0.5';
        modalNext.style.opacity = '0.5';

        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';

        // Show loading state
        showNotification(`Loading: ${lesson.title}`, 'info');
    }

    function closeModal() {
        modal.classList.remove('visible');
        pdfViewer.src = '';
        document.body.style.overflow = '';
        currentPreviewIndex = -1;

        // Reset navigation buttons
        modalPrev.style.opacity = '1';
        modalNext.style.opacity = '1';
    }

    function showPrevDocument() {
        if (currentPreviewIndex > 0) {
            const prevDoc = allDocuments[currentPreviewIndex - 1];
            openModal(prevDoc.id);
        }
    }

    function showNextDocument() {
        if (currentPreviewIndex < allDocuments.length - 1) {
            const nextDoc = allDocuments[currentPreviewIndex + 1];
            openModal(nextDoc.id);
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
            modalNext.disabled = currentPreviewIndex === allDocuments.length - 1;
            modalPrev.style.opacity = '1';
            modalNext.style.opacity = '1';
        }

        // Update button text
        modalPrev.innerHTML = `<i class="fas fa-arrow-left"></i> ${t.prevBtn}`;
        modalNext.innerHTML = `${t.nextBtn} <i class="fas fa-arrow-right"></i>`;
    }

    // --- 12. LANGUAGE/TRANSLATION (UPDATED WITH NAVIGATION) ---
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

        // Update document count
        const count = mainFilteredDocuments.length;
        docCount.textContent = `${count} ${t.docCount}`;

        // Update document title
        document.title = t.siteTitle;

        // Update navigation items
        updateNavigationText();

        // Update lessons sidebar if it exists
        if (lessonList.children.length > 0) {
            handleLessonFilterChange();
        }
    }

    function updateNavigationText() {
        const t = translations[currentLanguage];

        // Update navigation text while preserving icons
        if (navHome) {
            const icon = navHome.querySelector('i').cloneNode(true);
            navHome.innerHTML = '';
            navHome.appendChild(icon);
            navHome.appendChild(document.createTextNode(` ${t.navHome}`));
        }

        if (navWatchOnline) {
            const icon = navWatchOnline.querySelector('i').cloneNode(true);
            navWatchOnline.innerHTML = '';
            navWatchOnline.appendChild(icon);
            navWatchOnline.appendChild(document.createTextNode(` ${t.navWatchOnline}`));
        }

        if (navAboutUs) {
            const icon = navAboutUs.querySelector('i').cloneNode(true);
            navAboutUs.innerHTML = '';
            navAboutUs.appendChild(icon);
            navAboutUs.appendChild(document.createTextNode(` ${t.navAboutUs}`));
        }

        if (navArchives) {
            const icon = navArchives.querySelector('i').cloneNode(true);
            navArchives.innerHTML = '';
            navArchives.appendChild(icon);
            navArchives.appendChild(document.createTextNode(` ${t.navArchives}`));
        }

        if (navContact) {
            const icon = navContact.querySelector('i').cloneNode(true);
            navContact.innerHTML = '';
            navContact.appendChild(icon);
            navContact.appendChild(document.createTextNode(` ${t.navContact}`));
        }
    }

    // --- 13. NOTIFICATION SYSTEM ---
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

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

    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
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
        
        .lesson-card {
            background: white;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s ease;
        }
        
        .lesson-card:hover {
            transform: translateY(-2px);
        }
        
        .lesson-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        
        .lesson-title {
            margin: 0;
            font-size: 1.1rem;
            color: #333;
        }
        
        .lesson-date {
            font-size: 0.8rem;
            color: #666;
            background: #f0f0f0;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
        }
        
        .lesson-description {
            margin: 0.5rem 0;
            color: #555;
            font-size: 0.9rem;
        }
        
        .lesson-memory-verse {
            margin: 0.5rem 0;
            padding: 0.5rem;
            background: #f9f9f9;
            border-left: 3px solid #1a2b6d;
            font-size: 0.85rem;
            color: #444;
        }
        
        .lesson-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }
        
        .quarter-title {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #1a2b6d;
            text-align: center;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .coming-soon {
            text-align: center;
            padding: 2rem 1rem;
            color: #666;
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
    `;
    document.head.appendChild(notificationStyles);

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

    // --- 14. LOAD PREFERENCES AND START APP ---
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

        // Update the quarter pills to reflect the current quarter
        quarterPills.forEach(pill => {
            pill.classList.remove('active');
            if (pill.dataset.quarter === currentQuarter) {
                pill.classList.add('active');
            }
        });
    }

    // --- 15. ADMIN FUNCTIONS FOR UPDATING LESSONS ---
    // These functions can be called from an admin interface to update lessons
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
        if (currentQuarter === quarter) {
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
        if (currentQuarter === quarter) {
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
            if (currentQuarter === quarter) {
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

    // Start the application
    loadPreferences();
    loadSavedLessons();
    init();
});
