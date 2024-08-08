const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// const apiRoutes = require('./routes/api');
// const htmlRoutes = require('./routes/html');

// const api = require('./routes/index');

// const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;

const app = express();
const dbFile = path.join(__dirname, 'db', 'db.json');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile(dbFile, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Notes not Read '});
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = { ...req.body, id: uuidv4()};
    fs.readFile(dbFile, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Notes not Found'});
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbFile, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Note not saved'});
            }
            res.status(201).json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbFile, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Not not Found'});
        }
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(dbFile, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete note'});
            }
            res.status(204).end();
        });
    });
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});