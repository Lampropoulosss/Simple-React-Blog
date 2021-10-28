const mysql = require("mysql");
const keys = require("../config/keys");

// MySQL
const connection = mysql.createConnection({
  host: keys.sql.host,
  user: keys.sql.user,
  password: keys.sql.password,
  port: keys.sql.port,
  database: keys.sql.database,
});

connection.connect(() => {
  console.log(`MySQL connected...`);
});

module.exports = connection;
