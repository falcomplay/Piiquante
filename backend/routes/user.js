const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const verifyPassword = require('../middleware/verifyPassword');

router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;