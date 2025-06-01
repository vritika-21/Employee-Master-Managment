const db = require('../models/db');

exports.addEmployee = (req, res) => {
  const emp = req.body;
  console.log('Incoming employee data:', emp); 

  const sql = 'INSERT INTO employees SET ?';
  db.query(sql, emp, (err, result) => {
    if (err) {
      console.error('Database insert error:', err); 
      return res.status(500).send({ error: 'Insert failed', details: err });
    }
    res.send({ message: 'Employee added', id: result.insertId });
  });
};

exports.getEmployees = (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};