//apiRouter.js
 
const express =require('express');
const apiRouter = express.Router();
const db = require('../db.js');

apiRouter.get('/', async (req, res, next)=>{
    try {
        const players = await db.getAllPlayers();
        res.status(200).send(players);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

 
module.exports = apiRouter;