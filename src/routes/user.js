const express = require('express');
const router = express.Router();
const { requireAuth, checkUser } = require('../app/middlewares/authMiddleware');

const userController = require('../app/controller/UserController');

router.get('/:id',checkUser ,userController.showDetail);
router.put('/:id/edit',checkUser,requireAuth ,userController.updateDetail);
router.get('/:id/edit',checkUser ,userController.editDetail);



module.exports = router;