const User = require('../models/user')
const jwt = require("jsonwebtoken")
const {multipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')


const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', password: '' };
  
  // incorrect name
  if (err.message === 'incorrect username') {
    errors.username = 'That username is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.username = 'that username is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'SECRETHING', {
    expiresIn: maxAge
  });
};

class AuthController{
    signup_get(req,res,next){
        res.render('auth/register')
    }
    signup_post = async function(req,res,next){
      const { name, password } = req.body;

      try {
        const user = await User.create({ name, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
      }
      catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
      }
    }
    login_get(req,res,next){
      res.render('auth/login')
    }
    login_post = async function(req, res,next) {
        const { username, password } = req.body;
  
        try {
          const user = await User.login(username, password);
          const token = createToken(user._id);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json({ user: user._id });
        } 
        catch (err) {
          const errors = handleErrors(err);
          res.status(400).json({ errors });
        }
    }

    logout_get(req,res,next){
      res.cookie('jwt', '', { maxAge: 1 });
      res.redirect('/');
    }
    

}

module.exports = new AuthController();
