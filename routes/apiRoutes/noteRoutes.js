const express = require('express');
const router = express.Router();
const {notes} = require('../../db/db.json');
const {validateNote, addNewNote} = require('../../utils/utilityFunctions');

//initialize the note id counter
var noteId = notes.length;

//Respond with all notes in JSON format
router.get('/notes', (req, res)=>{
    res.json(notes);
});

//Add a new note to the db file after validating the entry
router.post('/notes', (req, res)=>{
    const note = req.body;
    
    //assign the note id
    note.id = noteId;
   

    if(validateNote(note)){
        //add the note to the notes array for writing
        const addedNote = addNewNote(notes, note);

        //increment the note id if the note has been validated.
        noteId++;

        res.json(addedNote);
    }
    else{
        res.status(400).json({error: 'Please enter a valid note with title, text, and id.'});
    }
});

module.exports = router;