// config module for secrets. shhhhhh. no peeking.
var config = require('../config/config');

// database since I have no idea how to use MongoDB
var mysql = require('mysql');

// connect it, yo.
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

// oooooooooooooh.
connection.connect();


function databaseQuery (query,options = null){
	return new Promise((resolve,reject)=>{
		connection.query(query,options,(error,results)=>{
			if(error){
				reject(error);
			}else{
				resolve(results);
			}
		})
	})
}


// promisary version of db queries to cut down on length of files.
module.exports = databaseQuery;
