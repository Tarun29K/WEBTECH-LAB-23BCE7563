const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/studentDB');

const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    description: String,
    created_date: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

// --- Routes ---

// 1. Add Note (POST)
app.post('/notes', async (req, res) => {
    const newNote = new Note(req.body);
    await newNote.save();
    res.json({ message: "Note saved!" });
});

// 2. View Notes (GET)
app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// 3. Update Note (PUT)
app.put('/notes/:id', async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Note updated!" });
});

// 4. Delete Note (DELETE)
app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));