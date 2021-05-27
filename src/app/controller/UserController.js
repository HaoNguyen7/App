const User = require('../models/user')
const {multipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')
class UserController {
    //[GET] /news/:slug
   showDetail(req,res,next){
    res.render('user/user-detail')
}
    editDetail(req,res,next){
        res.render('user/user-detail-edit')
    }
    updateDetail(req,res,next){
        User.updateOne({_id:req.params.id},req.body)
            .then(()=>res.redirect(`/user/${req.params.id}`))
            .catch(next)
    }
}

module.exports = new UserController();
