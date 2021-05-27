const express = require('express');
const router = express.Router();
const { requireAuth, checkUser } = require('../app/middlewares/authMiddleware');

const userController = require('../app/controller/UserController');

router.get('/:id',checkUser ,userController.showDetail);


module.exports = router;