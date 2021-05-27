const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const CategorySchema = new Schema({
    _id:{type:Number},
    name: { type: String,maxLength:255,required:true },
    description: { type: String,maxLength:600 },
    slug: { type: String, slug: "name",unique:true },
  },{
    timestamps:true
  });


//add plugin
mongoose.plugin(slug);

module.exports = mongoose.model('Category',  CategorySchema);
