const express = require('express');
const router = express.Router();

const authController = require('../app/controller/AuthController');

router.get('/register', authController.register);
router.post('/store', authController.store);
router.get('/login',authController.login)
router.post('/signin',authController.signin)
router.get('/signin',authController.in)
module.exports = router;