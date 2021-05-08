const express = require('express');
const router = express.Router();
const {notes} = require('../../db/db.json');
const {validateNote, addNewNote, findNoteById, removeNote} = require('../../utils/utilityFunctions');

//initialize the note id counter
//if there are saved notes then we set the counter to the highest id + 1 which will always be the last note
//if there are no saved notes then we set the counter to 0
var noteId = notes.length > 0 ? notes[notes.length-1].id + 1 : 1;

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

router.delete('/notes/:id', (req, res)=>{
    //Find a note based on the supplied id
    const note = findNoteById(notes, req.params.id);

    if(note){
        //If the note is found, remove it from the array and return data containing the removed note and new db
        removeNote(notes, req.params.id);
        res.json({removed: note, data: notes});
    }
    else{
        //Return an error if the note isnt found
        res.status(404).json({error: "Note was not found."});
    }
});

module.exports = router;