//auth.js

// /auth/ route
 
const express = require('express');
const apiRouter = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db.js');
const jwt = require('jsonwebtoken');

apiRouter.post('/createUser/', async (req, res, next) => {
    try {        
        const { name, password, steam } = req.body;

        bcrypt.hash(password, 5, function (err, hashedPW) {
            if (err) throw err;
            console.log(hashedPW)
            db.createUser(name, hashedPW, steam).then(user => {
                res.sendStatus(201).send("user created", user)
            }).catch(err => console.log(err))
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

 
module.exports = apiRouter;