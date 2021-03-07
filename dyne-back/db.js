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
 
let db = {}; //create an empty object you will use later to write  and export your queries. 
 
db.getAllPlayers = () =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM player LIMIT 5',  (error, players)=>{
            if(error){
                return reject(error);
            }
            return resolve(players);
        });
    });
};


module.exports = db