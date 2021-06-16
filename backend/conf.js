const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourPassword',
  database: 'yourDatabaseName'
})

module.exports = connection;
