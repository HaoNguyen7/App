const Course = require('../models/course')
const {multipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')
class UserController {
    //[GET] /news/:slug
   showDetail(req,res,next){
    res.render('user/user-detail')
}

   
}

module.exports = new UserController();
