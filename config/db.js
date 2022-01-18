let mysql      = require('mysql');

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'livreor',
  password : 'livreor',
  database : 'livreor',
  port: 3308
});

connection.connect()

module.exports = connection