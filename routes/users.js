const express  = require('express');
const router   = express.Router();
const User     = require('../models/user');
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const config   = require('../config/database');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        email:         req.body.email,
        username:      req.body.username,
        usernameLower: req.body.username.toLowerCase(),
        password:      req.body.password
    });

    User.addUser(newUser, (err, user) =>{
        if(err) {
            res.json({success: false, msg: 'Failed to register user'});
        }
        else {
            res.json({success: true, msg: 'User succesfully registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err){
                throw err;
            }
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn:604800 // 1 week
                });

                res.json({
                    success: true,
                    token:   'Bearer ' + token,
                    user: {
                        id:       user._id,
                        username: user.username,
                        email:    user.email
                    }
                });
            }
            else{
                return res.json({
                    success: false, 
                    msg:     'Wrong password'
                });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

// Check if username already exists in DB
router.post('/finduser', (req, res, next) => {
    const username = req.body.username;

    User.getUserByUsername(username, (err, user) => {
        if(err){
            throw err;
        }
        if(user){
            return res.send(true);
        }
        else{
            return res.send(false);
        }
    });
});

// Export router
module.exports = router;
