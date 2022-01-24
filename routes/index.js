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
router.get('/Login', function(req, res, next) {
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
  session : false ,
  successRedirect: '/admin',
  failureRedirect: '/Login',
  failureFlash: true
}), function (req, res, next) {
  if(req.session.oldUrl) {
      const oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
  } else {
      res.redirect('/admin');
  }
});
//end login route


// router.get('/info/:id', function(req, res, next) {
//   res.render('info', { id: req.params.id });
// });

// router.post('/submit',[
//   // Email must be an email and not empty
//   check('email').isEmail().normalizeEmail().withMessage('Email In valid') ,
//   check('email').notEmpty().withMessage('Email Empty') ,
// ], function(req, res, next) {
//   const errors = validationResult(req);
//   if(!errors.isEmpty()){
//     //req.session.error = errors.array();
//     //res.redirect('/');
//     return res.status(500).json({ errors: errors.array() });
//   }
//     req.session.error = false;
//     res.redirect('/info/'+req.body.email);
//     //res.render('info', { id: req.params.id });
// });


module.exports = router;
