var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Admin = require('../models/admin');
const passport = require('passport');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'  , layout: 'layout/layout' , success : req.session.success , error : req.session.error});
});

router.get('/about-us', function(req, res, next) {
  res.render('about', { title: 'About-Us'  , layout: 'layout/layout' , success : req.session.success , error : req.session.error});
});

router.get('/feature', function(req, res, next) {
  res.render('feature', { title: 'Feature'  , layout: 'layout/layout' , success : req.session.success , error : req.session.error});
});

router.get('/testmonials', function(req, res, next) {
  res.render('testmonials', { title: 'Testmonials'  , layout: 'layout/layout' , success : req.session.success , error : req.session.error});
});

router.get('/request-job', function(req, res, next) {
  res.render('job', { title: 'Request-Job'  , layout: 'layout/layout' , success : req.session.success , error : req.session.error});
});

router.get('/contact-us', function(req, res, next) {
  res.render('contact', { title: 'Contact-Us'  , layout: 'layout/layout' , success : req.session.success , error : req.session.error});
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

router.post('/Send-mail-contactus', function(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  });
  var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return redirect('/');
    }
  });
});


module.exports = router;
