const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Main directories to scan for PDFs
const DOC_DIRS = ['judah', 'tracks', 'pdfs'];

/**
 * Scan directories and return a flat list of documents
 */
function scanDocuments() {
    let documents = [];
    let idCounter = 1;

    DOC_DIRS.forEach(dir => {
        const fullPath = path.join(__dirname, dir);
        if (fs.existsSync(fullPath)) {
            const files = fs.readdirSync(fullPath);
            files.forEach(file => {
                if (file.toLowerCase().endsWith('.pdf')) {
                    documents.push({
                        id: idCounter++,
                        title: file.replace('.pdf', '').replace(/-/g, ' ').replace(/_/g, ' '),
                        fileName: `${dir}/${file}`,
                        type: dir === 'judah' ? 'Judah' : (dir === 'tracks' ? 'Tract' : 'Book'),
                        date: fs.statSync(path.join(fullPath, file)).mtime.toISOString().split('T')[0]
                    });
                }
            });
        }
    });

    return documents;
}

// API endpoint to fetch documents with filtering and pagination
app.get('/api/documents', (req, res) => {
    try {
        const { query = '', type = 'all', page = 1, limit = 12 } = req.query;
        let allDocs = scanDocuments();

        // Filtering
        if (type !== 'all') {
            allDocs = allDocs.filter(d => d.type.toLowerCase() === type.toLowerCase());
        }

        if (query) {
            const q = query.toLowerCase();
            allDocs = allDocs.filter(d =>
                d.title.toLowerCase().includes(q) ||
                d.fileName.toLowerCase().includes(q)
            );
        }

        // Pagination
        const total = allDocs.length;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const end = start + parseInt(limit);
        const results = allDocs.slice(start, end);

        res.json({
            documents: results,
            total,
            totalPages,
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve static files (optional, if you want the backend to host the PDFs)
app.use('/judah', express.static(path.join(__dirname, 'judah')));
app.use('/tracks', express.static(path.join(__dirname, 'tracks')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Scanned directories: ${DOC_DIRS.join(', ')}`);
});
