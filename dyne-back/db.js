//db.js

const mysql = require('mysql');
const sql = require('sql-template-strings')


const pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,    // the number of connections node.js will hold open to our database
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT

});

let db = {}; // create an empty object to write and export queries. 

// api

db.getAllPlayers = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM player', (error, players) => {
            if (error) {
                return reject(error);
            }
            return resolve(players);
        });
    });
};

db.getPlayersByTeam = (team) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        SELECT * FROM roster r
            LEFT JOIN player p ON r.player_id=p.player_id
            LEFT JOIN team t ON r.team_id=t.team_id
            LEFT JOIN season s ON r.season=s.season
        WHERE t.short='${team}'
            AND s.current=1

        `, (error, players) => {
            if (error) {
                return reject(error);
            }
            return resolve(players);
        });
    });
};


// Auth

db.createUser = (name, password, steam) => {
    return new Promise((resolve, reject) => {
        pool.query(sql`INSERT INTO gm (name, password, steam) 
                       VALUES (${name}, ${password}, ${steam})`,
            (error, user) => {
                if (error) {
                    return reject(error);
                }
                return resolve(user);
            });
    });

}
db.getCredentialsByName = (name) => {
    return new Promise((resolve, reject) => {
        pool.query(sql`SELECT name, password FROM gm WHERE name = ${name}`,
            (error, credentials) => {
                if (error) {
                    return reject(error);
                }
                return resolve(credentials[0]);
            });
    });

}

module.exports = db