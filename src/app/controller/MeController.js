const Course = require('../models/course')
const {multipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')
class MeController {
    //[GET] /news/:slug
   storedCourses(req,res,next){
      Promise.all([
          Course.find({}).sortable(req),
          Course.countDocumentsDeleted()])
            .then(([courses,deletedCount])=>{
                res.render('me/stored-courses',{
                    deletedCount,
                    courses:multipleMongooseToObject(courses)
                })
            })

   }
   trashCourses(req,res,next){
    Course.findDeleted({})
         .then(courses => res.render('me/trash-courses',{
             courses:multipleMongooseToObject(courses)
         }))
         .catch(next)
}

   
}

module.exports = new MeController();
