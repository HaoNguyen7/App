const User = require('../models/user')
const jwt = require("jsonwebtoken")
const {multipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')

class AuthController{
    register(req,res,next){
        res.render('auth/register')
    }
    store(req,res,next){
        const formData = req.body
        formData.image = ``
        const user = new User(formData)
        user.save()
            .then(()=> res.redirect('/auth/login'))
            .catch(error =>{

            })
    }
    login(req,res,next){
        res.render('auth/login')
    }
    signin(req, res,next) {
        console.log(req.body)
        User.findOne({ name: req.body.name }).exec((error, user) => {
          if (error) return res.status(400).json({ error })
          if (user) {
            if (user.password===req.body.password) {
              const token = jwt.sign(
                { _id: user._id, role: user.role },
                'SECRETHING',
                { expiresIn: "1d" }
              )
                console.log(token)
              const { _id, name, email, role } = user
              
              res.cookie("token", token, { expiresIn: "1d" })
              
              res.redirect('/')
            } else {
              return res.status(400).json({ message: "Invalid Password" })
            }
          } else {
            return res.status(400).json({ message: "Something went wrong" })
          }
        })
    }
    

}

module.exports = new AuthController();
