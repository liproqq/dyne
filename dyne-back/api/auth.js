//auth.js

// /auth/ route
 
const express =require('express');
const apiRouter = express.Router();
const db = require('../db.js');

apiRouter.get('/validate/', async (req, res, next)=>{
    try {        
        res.status(200).send(req.body.email);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

 
module.exports = apiRouter;