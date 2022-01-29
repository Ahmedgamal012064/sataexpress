var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const usercontrller  = require('../controller/usercontroller');

/* GET users listing. */
router.get('/:type', isLoggedIn,usercontrller.allusers);

/*********start create user*** */
router.get('/create/:type', isLoggedIn,function(req, res, next) {
  var type;
  var type2;
  if(req.params.type == 'client'){
    type2 = "user";
    type = 'العملاء';
  }else if(req.params.type == 'traders'){
    type2 = "vendor";
    type = 'التجار';
  }else if(req.params.type == 'deleveries'){
    type2 = "delevery";
    type = 'المندوبين';
  }else{
    res.redirect('/admin');
  }
  var errors = req.flash('registeruser');
  res.render('users/create',{title : 'Create-User',error:errors,type:type,type2:type2, layout: 'layout/admin' });
});
router.post('/insert', isLoggedIn,usercontrller.Inseruser);
/*********end create user*** */
/*********start Edit user*** */
router.get('/edit/:type/:id', isLoggedIn,function(req, res, next) {
  var type ;
  User.findOne({_id:req.params.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
    if(err){
      console.log(err);
      res.redirect('/');
    }
    console.log(result);
    if(req.params.type == 'client'){
      type = 'العملاء';
    }else if(req.params.type == 'traders'){
      type = 'التجار';
    }else if(req.params.type == 'deleveries'){
      type = 'المندوبين';
    }else{
      res.redirect('/admin');
    }
    res.render('users/edit',{title : 'Edit-User',type:type,user : result, layout: 'layout/admin' });
  });
});
router.post('/update', isLoggedIn,usercontrller.updateuser);
/*********end Edit user*** */
/*********start Delete user*** */
router.get('/delete/:id',isLoggedIn, usercontrller.deleteuser); 
/*********end Delete user*** */
//router.get('/detail/:id', usercontrller.deleteuser); 

function isLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) {
      console.log(req.isAuthenticated());
      res.redirect('/Login');
      return ;
  }
  return next();
}

module.exports = router;
