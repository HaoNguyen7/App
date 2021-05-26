const express = require('express');
const router = express.Router();
const { requireAuth, checkUser } = require('../app/middlewares/authMiddleware');

const courseController = require('../app/controller/CourseController');


router.get('/create',requireAuth,checkUser, courseController.create);
router.post('/store', requireAuth,checkUser,courseController.store);
router.get('/:id/edit',requireAuth,checkUser,courseController.edit)
router.post('/handle-form-actions',requireAuth,checkUser,courseController.handleFormActions)
router.put('/:id',requireAuth,checkUser,courseController.update)
router.delete('/:id',requireAuth,checkUser,courseController.destroy)
router.delete('/:id/force',requireAuth,checkUser,courseController.forceDestroy)
router.patch('/:id/restore',requireAuth,checkUser,courseController.restore)
router.get('/:slug', courseController.show);


module.exports = router;
