//apiRouter.js

const express = require('express');
const apiRouter = express.Router();
const db = require('../db.js');

apiRouter.get('/allplayers', async (req, res, next) => {
    try {
        const players = await db.getAllPlayers();
        res.status(200).send(players);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

apiRouter.get('/playersTeam', async (req, res, next) => {
    //TODO: get team by gm name then query below to keep getPlayersByTeam reusable

    try {
        const players = await db.getPlayersByTeam(req.body.team);
        res.status(200).send(players);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// query all current teams


module.exports = apiRouter;