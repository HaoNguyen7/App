const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UserSchema = new Schema({ 
    name: { type: String,maxLength:255,required:true },
    email: { type: String,maxLength:600 },
    avatar: { type: String,maxLength:255 },
    password: { type: String,required:true },
    role:{type:String,default:'client'}
  },{
    timestamps:true
  });

  //sortable

//add plugin
mongoose.plugin(slug);

UserSchema.plugin(mongooseDelete,{
   overrideMethods: 'all',
   deletedAt:true
   })

module.exports = mongoose.model('User',  UserSchema);
