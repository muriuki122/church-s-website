from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'kaloleni_church_secret_key_123')
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///church_web.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- MODELS ---

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(500))  # PDF path
    publish_date = db.Column(db.String(20), default=lambda: datetime.now().strftime('%Y-%m-%d'))
    status = db.Column(db.String(20), default='published')
    author = db.Column(db.String(100), default='Admin')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'content': self.content,
            'image': self.image,
            'publishDate': self.publish_date,
            'status': self.status,
            'author': self.author
        }

class ArchiveDocument(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    file_name = db.Column(db.String(500), nullable=False)
    is_dynamic = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'fileName': self.file_name,
            'isDynamic': self.is_dynamic
        }

class BibleLesson(db.Model):
    id = db.Column(db.String(100), primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    memory_verse = db.Column(db.Text)
    pdf_url = db.Column(db.String(500))
    quarter = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date,
            'memoryVerse': self.memory_verse,
            'pdfUrl': self.pdf_url,
            'quarter': self.quarter
        }

# --- AUTH LOGIC (SIMPLIFIED FOR LOCAL SETUP) ---
AUTHORIZED_ADMINS = {
    'muriukic522@gmail.com': 'password123',  # User should change this
    'admin@kalolenichurch.org': 'church2024'
}

# --- ROUTES ---

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email', '').strip().lower()
    password = data.get('password')

    # Case-insensitive email check
    authorized_admins_lower = {k.lower(): v for k, v in AUTHORIZED_ADMINS.items()}

    if email in authorized_admins_lower and authorized_admins_lower[email] == password:
        session['user'] = email
        return jsonify({'success': True, 'user': {'email': email}})
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = BlogPost.query.order_by(BlogPost.publish_date.desc()).all()
    return jsonify([p.to_dict() for p in posts])

@app.route('/api/posts', methods=['POST'])
def add_post():
    data = request.json
    new_post = BlogPost(
        title=data.get('title'),
        category=data.get('category'),
        content=data.get('content'),
        image=data.get('image'),
        publish_date=data.get('publishDate'),
        author=data.get('author', 'Admin')
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'success': True, 'post': new_post.to_dict()})

@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/documents', methods=['GET'])
def get_documents():
    # AUTO-REPAIR: If we have less than 140 docs, seed them immediately
    if ArchiveDocument.query.count() < 140:
        print("DETECTED DATA LOSS: Auto-repairing library...")
        seed_database(force=True)
        
    docs = ArchiveDocument.query.all()
    return jsonify([d.to_dict() for d in docs])


@app.route('/api/documents', methods=['POST'])
def add_document():
    data = request.json
    new_doc = ArchiveDocument(
        title=data.get('title'),
        category=data.get('category'),
        file_name=data.get('fileName')
    )
    db.session.add(new_doc)
    db.session.commit()
    return jsonify({'success': True, 'document': new_doc.to_dict()})

@app.route('/api/lessons', methods=['GET'])
def get_lessons():
    lessons = BibleLesson.query.all()
    return jsonify([l.to_dict() for l in lessons])

@app.route('/api/lessons', methods=['POST'])
def add_lesson():
    data = request.json
    new_lesson = BibleLesson(
        id=data.get('id'),
        title=data.get('title'),
        date=data.get('date'),
        memory_verse=data.get('memoryVerse'),
        pdf_url=data.get('pdfUrl'),
        quarter=data.get('quarter')
    )
    db.session.merge(new_lesson)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/documents/<int:doc_id>', methods=['DELETE'])
def delete_document(doc_id):
    doc = ArchiveDocument.query.get_or_404(doc_id)
    db.session.delete(doc)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/lessons/<string:lesson_id>', methods=['DELETE'])
def delete_lesson(lesson_id):
    lesson = BibleLesson.query.get_or_404(lesson_id)
    db.session.delete(lesson)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/seed', methods=['GET'])
def force_seed():
    """Manual trigger to re-seed database if data is missing."""
    seed_database(force=True)
    return jsonify({'success': True, 'message': 'Database seeded successfully with 142 documents'})

def seed_database(force=False):
    # FORCE SEED: Clear and re-populate if count < 140 or if forced
    doc_count = ArchiveDocument.query.count()
    if force or doc_count < 140:
        print(f"DATABASE REPAIR: Syncing documents... (current count: {doc_count})")
        ArchiveDocument.query.delete()
        
        initial_docs = [
            # BOOKS
            {"title": "Babylon Mystery Religion", "category": "Books", "file_name": "Babylon-Mystery-Religion-by-Ralph-Woodrow-1981.pdf"},
            {"title": "Complete Jewish Bible", "category": "Books", "file_name": "Complete-Jewish-Bible.pdf"},
            {"title": "Dugger Porter Debate", "category": "Books", "file_name": "Dugger-Porter-Debate.pdf"},
            {"title": "Fox's Book of Martyrs", "category": "Books", "file_name": "FOXs-BOOK-of-MARTYRS.pdf"},
            {"title": "Forty Points of Doctrine", "category": "Books", "file_name": "FortyPointsOfDoctrine.pdf"},
            {"title": "The Bible Home Instructor", "category": "Books", "file_name": "THE-BIBLE-HOME-INSTRUCTOR.pdf"},
            {"title": "The Two Babylons", "category": "Books", "file_name": "The-Two-Babylons.pdf"},
            {"title": "A History of the True Church", "category": "Books", "file_name": "A-History-of-the-True-Church-Dugger-and-Dodd.pdf"},
            # TRACTS
            {"title": "Beginning and Ending of Elohim's Day", "category": "Tracts", "file_name": "tracks/Beginning_and_Ending_of_Gods_Day.pdf"},
            {"title": "Biblical Doctrine of Predestination", "category": "Tracts", "file_name": "tracks/Biblical-Doctrine-of-Predestination.pdf"},
            {"title": "Coming Home", "category": "Tracts", "file_name": "tracks/Coming-Home.pdf"},
            {"title": "Crises Dates in Bible Prophecy", "category": "Tracts", "file_name": "tracks/Crises-Dates-in-Bible-Prophecy.pdf"},
            {"title": "Daniel", "category": "Tracts", "file_name": "tracks/DANIEL.pdf"},
            {"title": "Death in the Kitchen", "category": "Tracts", "file_name": "tracks/Death-in-the-Kitchen.pdf"},
            {"title": "Deliverance from Plagues", "category": "Tracts", "file_name": "tracks/Deliverance-from-plaques-is-knowing-his-number.pdf"},
            {"title": "Doctrine and History of the True Religion", "category": "Tracts", "file_name": "tracks/Doctrine-and-History-of-the-True-Religion.pdf"},
            {"title": "Doctrine and History of the Primitive Church", "category": "Tracts", "file_name": "tracks/Doctrine-and-history-of-the-primitive-church.pdf"},
            {"title": "Does It Make Difference", "category": "Tracts", "file_name": "tracks/Does-it-make-difference.pdf"},
            {"title": "Does the Bible Contradict Itself", "category": "Tracts", "file_name": "tracks/Does-the-Bible-Contradict-Itself.pdf"},
            {"title": "Easter, Christmas And Sunday Were Pagan", "category": "Tracts", "file_name": "tracks/Easter-Christmas-And-Sunday-Were-Pagan.pdf"},
            {"title": "Explanation of Common Texts Against the Bible Sabbath", "category": "Tracts", "file_name": "tracks/Explanation-of-common-texts-used-against-the-Bible-Sabbath.pdf"},
            {"title": "Forty Reasons Why The 7th Day Sabbath Should Be Kept", "category": "Tracts", "file_name": "tracks/Forty-Reasons-Why-The-7th-Day-Sabbath-Should-Be-Kept.pdf"},
            {"title": "Hell - What and Where is it", "category": "Tracts", "file_name": "tracks/Hell-What-and-Where-is-it.pdf"},
            {"title": "How Old is Your Church", "category": "Tracts", "file_name": "tracks/How-old-is-your-Church.pdf"},
            {"title": "I Will Bless Them That Bless Thee", "category": "Tracts", "file_name": "tracks/I-will-Bless-Them-That-Bless-Thee.pdf"},
            {"title": "Israel 3", "category": "Tracts", "file_name": "tracks/Israel3.pdf"},
            {"title": "Israel's Elohim - A Reality or a Myth", "category": "Tracts", "file_name": "tracks/Israels-God-a-Reality-or-a-Myth.pdf"},
            {"title": "Judah - Failure to Stand by Her Agreed Test", "category": "Tracts", "file_name": "tracks/Judah-Failure-to-Stand-by-Her-Agreed-Test-of-Over-1900-Years-Ago-But-many-are-now.pdf"},
            {"title": "Mt. Zion Reporter", "category": "Tracts", "file_name": "tracks/Mt-Zion-Reporter_AN-Dugger.pdf"},
            {"title": "Mt. Sinai Speaks Once More", "category": "Tracts", "file_name": "tracks/Mt.-Sinai-Speaks-Once-More.pdf"},
            {"title": "One Door for the Gentiles to Enter", "category": "Tracts", "file_name": "tracks/One-door-for-the-Gentiles-to-enter.pdf"},
            {"title": "Passover and Lord's Supper", "category": "Tracts", "file_name": "tracks/Passover_and_Lords_Supper.pdf"},
            {"title": "Punishment of the Wicked", "category": "Tracts", "file_name": "tracks/Punishment-of-the-wicked.pdf"},
            {"title": "Reasons Why Seven Last Plagues Are in the Future", "category": "Tracts", "file_name": "tracks/REASONS-WHY-SEVEN-LAST-PLAQUES-ARE-IN-THE-FUTURE.pdf"},
            {"title": "Revelation", "category": "Tracts", "file_name": "tracks/REVELATION.pdf"},
            {"title": "Search the Scriptures", "category": "Tracts", "file_name": "tracks/Search-the-scriptures.pdf"},
            {"title": "The Resurrection of Christ", "category": "Tracts", "file_name": "tracks/THE-RESURRECTION-OF-CHRIST.pdf"},
            {"title": "The Bible Name for the Church", "category": "Tracts", "file_name": "tracks/The-Bible-Name-for-the-Church.pdf"},
            {"title": "The Daughter of Jerusalem and the Daughter of Babylon", "category": "Tracts", "file_name": "tracks/The-Daughter-of-Jerusalem-and-the-Daughter-of-Babylon.pdf"},
            {"title": "The Greatest Discovery of the Age - Noah's Ark Found", "category": "Tracts", "file_name": "tracks/The-Greatest-Discovery-of-the-Age-Noahs-Ark-Found.pdf"},
            {"title": "The Greatest Miracle of the Age - The Re-birth of Israel", "category": "Tracts", "file_name": "tracks/The-Greatest-Miracle-of-the-Age-The-Re-birth-of-Israel.pdf"},
            {"title": "The Holy Spirit", "category": "Tracts", "file_name": "tracks/The-Holy-Spirit.pdf"},
            {"title": "The Law of the Spirit of Life", "category": "Tracts", "file_name": "tracks/The-Law-of-the-Spirit-of-Life.pdf"},
            {"title": "The Pending World Scourge - Daniel and Revelation", "category": "Tracts", "file_name": "tracks/The-Pending-World-Scourage-Daniel-and-Revelation.pdf"},
            {"title": "The Restoration of the Kingdom to Israel", "category": "Tracts", "file_name": "tracks/The-Restoration-of-the-Kingdom-to-Israel.pdf"},
            {"title": "The Ten Tribes of Israel - Not Lost but Found", "category": "Tracts", "file_name": "tracks/The-Ten-Tribes-of-Israel-Not-lost-hut-found.pdf"},
            {"title": "The End of the World", "category": "Tracts", "file_name": "tracks/The-end-of-the-world.pdf"},
            {"title": "The Eternal Abode of the Righteous", "category": "Tracts", "file_name": "tracks/The-eternal-abode-of-the-righteous.pdf"},
            {"title": "The Law of Elohim versus Devil's Scrapbook", "category": "Tracts", "file_name": "tracks/The-law-of-God-versus-Devils-scrapbook.pdf"},
            {"title": "The Living Truth", "category": "Tracts", "file_name": "tracks/The-living-Truth.pdf"},
            {"title": "The Mirror of Elohim", "category": "Tracts", "file_name": "tracks/The-mirror-of-God.pdf"},
            {"title": "Why I Am Not a Seventh Day Adventist", "category": "Tracts", "file_name": "tracks/WHY-I-AM-NOT-A-SEVENTH-DAY-ADVENTIST.pdf"},
            {"title": "Was Man Created", "category": "Tracts", "file_name": "tracks/Was-Man-Created.pdf"},
            {"title": "Was Peter the Foundation Rock", "category": "Tracts", "file_name": "tracks/Was-Peter-the-Foundation-Rock.pdf"},
            {"title": "What Is the Real Baptism Doctrine", "category": "Tracts", "file_name": "tracks/What-Is-the-Real-Baptism-Doctrine.pdf"},
            {"title": "What Was Abolished By Christ", "category": "Tracts", "file_name": "tracks/What-Was-Abolished-By-Christ.pdf"},
            {"title": "Which Day is The Sabbath", "category": "Tracts", "file_name": "tracks/Which-Day-is-The-Sabbath.pdf"},
            {"title": "Who Are The Messianic Jews In Israel", "category": "Tracts", "file_name": "tracks/Who-Are-The-Messianic-Jews-In-Israel.pdf"},
            {"title": "Why Not Talk to Elohim About Sabbath", "category": "Tracts", "file_name": "tracks/Why-not-talk-to-God-about-Sabbath.pdf"},
            {"title": "Has Our Messiah Come", "category": "Tracts", "file_name": "tracks/has-our-messiah-come-better.pdf"},
            {"title": "Why Israel is Here to Stay", "category": "Tracts", "file_name": "tracks/why-israel-is-here-to-stay-potrait.pdf"},
            {"title": "Year of Deception", "category": "Tracts", "file_name": "tracks/year%20of%20deception.pdf"},
            # JUDAH
            {"title": "Judah/72-sebat", "category": "Judah", "file_name": "judah/72-Sebat.pdf"},
            {"title": "Judah/78 Tebet", "category": "Judah", "file_name": "judah/78-Tibet.pdf"},
            {"title": "Judah/96 Nov", "category": "Judah", "file_name": "judah/96-Nov.pdf"},
            {"title": "Judah/98 july", "category": "Judah", "file_name": "judah/98-July.pdf"},
            {"title": "Judah/91 Sept", "category": "Judah", "file_name": "judah/91-Sept.pdf"},
            {"title": "Judah/83 Tebet", "category": "Judah", "file_name": "judah/83-Tibet.pdf"},
            {"title": "Judah/94 Dec", "category": "Judah", "file_name": "judah/94-Dec.pdf"},
            {"title": "Judah/80 Tebet", "category": "Judah", "file_name": "judah/80-Tebet.pdf"},
            {"title": "Judah/81 Elul", "category": "Judah", "file_name": "judah/81-Elul.pdf"},
            {"title": "Judah/90 Alul", "category": "Judah", "file_name": "judah/90-Alul.pdf"},
            {"title": "Judah/89 Bul", "category": "Judah", "file_name": "judah/89-Bul.pdf"},
            {"title": "Judah/81 Bul", "category": "Judah", "file_name": "judah/81-Bul.pdf"},
            {"title": "Judah/79 Sivan", "category": "Judah", "file_name": "judah/79-Sivan.pdf"},
            {"title": "Judah 71 Tebet", "category": "Judah", "file_name": "judah/71-Tebet.pdf"},
            {"title": "Judah/87 Zif", "category": "Judah", "file_name": "judah/87-Zif.pdf"},
            {"title": "Judah/85 July", "category": "Judah", "file_name": "judah/85-July.pdf"},
            {"title": "Judah/84 Chisleu", "category": "Judah", "file_name": "judah/84-Chisleu.pdf"},
            {"title": "Judah/83 July", "category": "Judah", "file_name": "judah/83-July.pdf"},
            {"title": "Judah/78 Elul", "category": "Judah", "file_name": "judah/78-Elul.pdf"},
            {"title": "Judah/79 Bul", "category": "Judah", "file_name": "judah/79-Bul.pdf"},
            {"title": "Judah/80 Elul", "category": "Judah", "file_name": "judah/80-Elul.pdf"},
            {"title": "Judah/81 sivan", "category": "Judah", "file_name": "judah/81-Sivan.pdf"},
            {"title": "Judah/82 Bul-chisleu", "category": "Judah", "file_name": "judah/82-Bul-Chisleu.pdf"},
            {"title": "Judah/82 Elul", "category": "Judah", "file_name": "judah/82-Elul.pdf"},
            {"title": "Judah/88 Sivan", "category": "Judah", "file_name": "judah/88-Sivan.pdf"},
            {"title": "Judah/82 NovDec", "category": "Judah", "file_name": "judah/Judah-82-NovDec.pdf"},
            {"title": "Judah/86 Aug", "category": "Judah", "file_name": "judah/Judah-86Aug.pdf"},
            {"title": "Judah/91", "category": "Judah", "file_name": "judah/Judah-91.pdf"},
            {"title": "Judah/Feb 1970", "category": "Judah", "file_name": "judah/Feb-1970.pdf"},
            {"title": "Judah/Jan-Feb-1977", "category": "Judah", "file_name": "judah/Jan-Feb-1977.pdf"},
            {"title": "Judah/Jan 1974", "category": "Judah", "file_name": "judah/Jan-1974.pdf"},
            {"title": "Judah/Jan-1971", "category": "Judah", "file_name": "judah/Jan-1971.pdf"},
            {"title": "Judah/July-1970", "category": "Judah", "file_name": "judah/July-1970.pdf"},
            {"title": "Judah/Dec-1974", "category": "Judah", "file_name": "judah/Judah-Dec-1974.pdf"},
            {"title": "Judah/June 1974", "category": "Judah", "file_name": "judah/Judah-June-1974.pdf"},
            {"title": "Judah/July 1974", "category": "Judah", "file_name": "judah/Judah-July-1974.pdf"},
            {"title": "Judah/Octomber 1971", "category": "Judah", "file_name": "judah/Judah-Oct-1971.pdf"},
            {"title": "Judah/Sept 1974", "category": "Judah", "file_name": "judah/Judah-Sep-1974.pdf"},
            {"title": "Judah/Sept 1956", "category": "Judah", "file_name": "judah/MZR1956Sept.pdf"},
            {"title": "Judah/82 Nisan", "category": "Judah", "file_name": "judah/82-Nisan.pdf"},
            {"title": "Judah/july 80", "category": "Judah", "file_name": "judah/80-July.pdf"},
            {"title": "Judah/83 Elul", "category": "Judah", "file_name": "judah/83-Elul.pdf"},
            {"title": "Judah/98 Nov", "category": "Judah", "file_name": "judah/98-Nov.pdf"},
            {"title": "Judah/96-August", "category": "Judah", "file_name": "judah/96-Aug.pdf"},
            {"title": "Judah/88-Bul", "category": "Judah", "file_name": "judah/88-Bul.pdf"},
            {"title": "Judah/85-Chisleu", "category": "Judah", "file_name": "judah/85-Chesleu.pdf"},
            {"title": "Judah/73-July", "category": "Judah", "file_name": "judah/73-July.pdf"},
            {"title": "Judah/81-chisleu", "category": "Judah", "file_name": "judah/81-Chesleu.pdf"},
            {"title": "Judah/97-March", "category": "Judah", "file_name": "judah/97-March.pdf"},
            {"title": "Judah/91- May", "category": "Judah", "file_name": "judah/91-May.pdf"},
            {"title": "Judah/81-July", "category": "Judah", "file_name": "judah/81-July.pdf"},
            {"title": "Judah/79-Zif", "category": "Judah", "file_name": "judah/79-Zif.pdf"},
            {"title": "Judah/79-Ethanim", "category": "Judah", "file_name": "judah/79-Ethanim.pdf"},
            {"title": "Judah/81-August", "category": "Judah", "file_name": "judah/81-August.pdf"},
            {"title": "Judah/77-August", "category": "Judah", "file_name": "judah/77-August.pdf"},
            {"title": "Judah/73-Zif", "category": "Judah", "file_name": "judah/73-Zif.pdf"},
            {"title": "Judah/Zif-Sivan", "category": "Judah", "file_name": "judah/77-Zif-Sivan.pdf"},
            {"title": "Judah/72-July", "category": "Judah", "file_name": "judah/72-July.pdf"},
            {"title": "Judah/89-August", "category": "Judah", "file_name": "judah/89-August.pdf"},
            {"title": "Judah/93-May", "category": "Judah", "file_name": "judah/93-May.pdf"},
            {"title": "Judah/73-bul", "category": "Judah", "file_name": "judah/73-Bul.pdf"},
            {"title": "Judah/73-chisleu", "category": "Judah", "file_name": "judah/73-Chisleu.pdf"},
            {"title": "Judah/72-Elul", "category": "Judah", "file_name": "judah/72-Elul.pdf"},
            {"title": "Judah/82-Ethanim", "category": "Judah", "file_name": "judah/82-Ethanim.pdf"},
            {"title": "Judah/MZR2008-Q2", "category": "Judah", "file_name": "judah/MZR2008-Q2.pdf"},
            {"title": "Judah/95MarchApr", "category": "Judah", "file_name": "judah/Judah-95MarApr.pdf"},
            {"title": "Judah/90", "category": "Judah", "file_name": "judah/Judah-90.pdf"},
            {"title": "Judah/July-1987", "category": "Judah", "file_name": "judah/July-1987.pdf"},
            {"title": "Judah/June-1974", "category": "Judah", "file_name": "judah/June-1972.pdf"},
            {"title": "Judah/March-1974", "category": "Judah", "file_name": "judah/March-1974.pdf"},
            {"title": "Judah/May-1972", "category": "Judah", "file_name": "judah/May-1972.pdf"},
            {"title": "Judah/Nov-Bul-1959", "category": "Judah", "file_name": "judah/Nov-Bul-1959.pdf"},
            {"title": "Judah/June-1971", "category": "Judah", "file_name": "judah/Judah-June-1971.pdf"},
            {"title": "Judah/Octomber-1970", "category": "Judah", "file_name": "judah/Judah-Oct-1970.pdf"},
            {"title": "Judah/Feb-1971", "category": "Judah", "file_name": "judah/Judah-Feb-1971.pdf"},
            {"title": "Judah/May-1971", "category": "Judah", "file_name": "judah/Judah-May-1971.pdf"},
            {"title": "Judah/Dec-1974", "category": "Judah", "file_name": "judah/Judah-Dec-1974-2.pdf"},
            {"title": "Judah/1960-Bul-November", "category": "Judah", "file_name": "judah/Judah-1960-Bul-November.pdf"}
        ]
        for doc_data in initial_docs:
            db.session.add(ArchiveDocument(**doc_data, is_dynamic=False))
    
    if not BibleLesson.query.first():
        print("Seeding bible lessons...")
        initial_lessons = [
            {
                "id": "q1-1",
                "title": "First Quarter Lesson 2026",
                "date": "January - March 2026",
                "memory_verse": "Study to shew thyself approved unto Elohim - 2 Timothy 2:15",
                "pdf_url": "lessons/Lesson 1st quarter 2026- FINAL.pdf",
                "quarter": 1
            }
        ]
        for lesson_data in initial_lessons:
            db.session.add(BibleLesson(**lesson_data))
    
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_database()
        if not BlogPost.query.first():
            print("Seeding initial blog posts...")
            pass
    app.run(debug=True, port=5000)
