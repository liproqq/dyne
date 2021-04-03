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
            db.createUser(name, hashedPW, steam).then(user => {
                res.sendStatus(201).send("user created", user)
            }).catch(err => console.log(err))
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

apiRouter.post("/login/", async (req, res) => {

    const { name, password } = req.body;

    const credentials = await db.getCredentialsByName(name);

    const isValid = await bcrypt.compare(password, credentials.password);

    if (isValid) {
        const expiration =3600 * 24 * 30
        const jwtBearerToken = jwt.sign({ name: name }, process.env.JWT_PRIVATE_KEY, { expiresIn:expiration })

        res.status(200).json({
            idToken: jwtBearerToken, 
            expiresIn: expiration
          });                         
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
})


module.exports = apiRouter;