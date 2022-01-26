var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Admin = require('../models/admin');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'  , layout: 'layout/layout' , success : req.session.success , error : req.session.error});
});

//start login route
router.get('/Login',notLoggedIn,function(req, res, next) {
  var errors = req.flash('login-error');
  authuser = req.user;
  res.render('auth/login', { title: 'Login' , layout: 'layout/login' ,authuser:authuser, error : errors});
});

router.post('/Login',[
  check('email').notEmpty().isEmail().withMessage('Email In valid'),
  check('password').notEmpty().withMessage('password In valid')
],(req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const messages = [];
      for(var i = 0 ; i < errors.errors.length ; i++){
          messages.push(errors.errors[i].msg);
      }
      req.flash('login-error', messages)
      res.redirect('Login'); 
      return ;
    }
    next();
},passport.authenticate('local-signin', {
  successRedirect: '/admin',
  failureRedirect: '/Login',
  failureFlash: true
}));
//end login route

function notLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    res.redirect('/admin');
    return ;
  }
  return next();
}


module.exports = router;
