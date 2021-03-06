const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const CourseSchema = new Schema({
    _id:{type:Number},
    name: { type: String,maxLength:255,required:true },
    description: { type: String,maxLength:600 },
    image: { type: String,maxLength:255 },
    videoId: { type: String,required:true },
    level: { type: String,maxLength:255 },
    slug: { type: String, slug: "name",unique:true },
    author:{type: Schema.Types.ObjectId,
      ref: "User",},
      category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
      }
  },{
    timestamps:true
  });

  //sortable
  CourseSchema.query.sortable = function(req){
    if(req.query.hasOwnProperty('_sort')){
      const isValidtype = ['asc','desc'].includes(req.query.type)
      return this.sort({
        [req.query.column]:isValidtype ? req.query.type :'desc',
      })
    }
    return this
  }
//add plugin
mongoose.plugin(slug);
CourseSchema.plugin(AutoIncrement)
CourseSchema.plugin(mongooseDelete,{
   overrideMethods: 'all',
   deletedAt:true
   })

module.exports = mongoose.model('Course',  CourseSchema);
