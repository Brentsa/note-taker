const express = require('express');
const router = express.Router();
const {notes} = require('../../db/db.json');

//Respond with all notes in JSON format
router.get('/notes', (req, res)=>{
    res.json(notes);
});

module.exports = router;