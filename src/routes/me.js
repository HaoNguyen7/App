const express = require('express');
const router = express.Router();
const { requireAuth, checkUser } = require('../app/middlewares/authMiddleware');

const meController = require('../app/controller/MeController');


router.get('/stored/courses', requireAuth,checkUser,meController.storedCourses);
router.get('/trash/courses', requireAuth,checkUser,meController.trashCourses);





module.exports = router;
