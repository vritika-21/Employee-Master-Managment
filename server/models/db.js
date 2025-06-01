const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_management',
});

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL Database Connected!');
});

module.exports = connection;