const express = require('express');
const router = express.Router();
const { addEmployee, getEmployees } = require('../controllers/employeeController');

router.post('/employees', addEmployee);
router.get('/employees', getEmployees);

module.exports = router;