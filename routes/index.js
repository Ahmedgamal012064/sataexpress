var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'  , layout: 'layout/layout' , success : req.session.success , error : req.session.error});
});

//start login route
router.get('/Login', function(req, res, next) {
  res.render('auth/login', { title: 'Login' , layout: 'layout/login' , error : req.session.error});
});

router.post('/Login',[
    // Email must be an email and not empty
    check('email').isEmail().normalizeEmail().withMessage('Email In valid') ,
    check('email').notEmpty().withMessage('Email Empty') ,
    check('password').notEmpty() ,
    check('password').isLength({min:5}) ,
    // check('confirm-password').custom((value , {req})=>{
    //     if(value != req.body.password){
    //       throw new Error('Password confirm Not match');
    //     }
    //     return true;
    // })
], function(req, res, next) {
  res.redirect('admin');
  return ;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      req.session.error = errors.array();
      res.redirect('/Login');
      //return res.status(500).json({ errors: errors.array() });
    }
    req.session.success = 'Login Successfully';
    res.redirect('admin');
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
