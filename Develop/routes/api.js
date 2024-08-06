const router = require('express').Router();
const { readNotes, writeNotes } = require('../notes'); 
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
    try {
        const notes = readNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Notes Not Read' });
    }
});


router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (!title || !text) {
        return res.status(400).json({ error: 'Title and text are required' });
    }
    try {
        const notes = readNotes();
        const newNote = { id: uuidv4(), title, text };
        notes.push(newNote);
        writeNotes(notes);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Note not added' });
    }
});


router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    try {
        const notes = readNotes();
        const updatedNotes = notes.filter(note => note.id !== id);
        
        if (notes.length === updatedNotes.length) {
            return res.status(404).json({ error: 'Note not found' });
        }

        writeNotes(updatedNotes);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

module.exports = router;