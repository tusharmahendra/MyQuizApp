const mysql = require('mysql');

var db  = mysql.createPool({
    connectionLimit : 10,
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'ba0a8d31597c94',
    password: 'def8d842',
    database: 'heroku_6905c85c94c3269'
  });
  
module.exports = db;