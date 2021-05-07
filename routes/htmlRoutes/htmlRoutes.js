const express = require('express');
const router = express.Router();
const path = require('path');

//Serve the notes page if specified in the request
router.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

//Serve the html main page to the client
router.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;

