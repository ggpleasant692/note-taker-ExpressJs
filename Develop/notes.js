const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db.json');

const readNotes = () => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Failed to read notes');
    }
};

const writeNotes = (notes) => {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2));
    } catch (error) {
        throw new Error('Failed to write notes');
    }
};

module.exports = { readNotes, writeNotes };