const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UserSchema = new Schema({ 
    name: { type: String,maxLength:255,required:true },
    username: { type: String,maxLength:255,required:true },
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
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
UserSchema.statics.login = async function(username, password) {
  
  const user = await this.findOne({ username: username });
  if (user) {
    // const auth = await bcrypt.compare(password, user.password);
    if (user.password === password) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect name');
};

UserSchema.plugin(mongooseDelete,{
   overrideMethods: 'all',
   deletedAt:true
   })

module.exports = mongoose.model('User',  UserSchema);
