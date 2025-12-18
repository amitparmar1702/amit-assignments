const express = require('express');
const { signupvalidation, loginvalidation } = require('../middleware/validation');
const { signup , login } = require('../controller/controller');

const router = express.Router();



router.post('/signup', signupvalidation, signup);
router.post('/login', loginvalidation, login);

module.exports = router;
