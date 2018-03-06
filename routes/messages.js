const express     = require('express');
const router      = express.Router();
const ChatMessage = require('../models/chatmessage');
const passport    = require('passport');
const jwt         = require('jsonwebtoken');
const config      = require('../config/database');

// Add a new message
router.post('/',(req, res, next) => {
    const msg = new ChatMessage({
        username: req.body.username,
        text:     req.body.text
    });
    msg.save()
    .then(result => { // save successful 
        res.status(201).json({
            message: "New message added to db",
            createdMessage: msg
        });
    })
    .catch(err => console.log(err)); // save failed
});

// Get newest 50 messages
router.get('/', (req, res, next) => {
    ChatMessage.find()
    .sort({_id:-1})
    .limit(5)
    .exec()
    .then(docs => { // find successful
        res.status(200).json(docs);
    })
    .catch(err => { // find failed
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Export router
module.exports = router;
