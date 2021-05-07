const express = require('express');
const router = express.Router();
const {notes} = require('../../db/db.json');

//Respond with all notes in JSON format
router.get('/notes', (req, res)=>{
    res.json(notes);
});

//Add a new note to the db file after validating the entry
router.post('/notes', (req, res)=>{
    const note = req.body;
    note.id = notes.length;
    notes.push(note);

    console.log(note);
    res.json(notes);
});

module.exports = router;