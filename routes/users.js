var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const usercontrller  = require('../controller/usercontroller');

/* GET users listing. */
router.get('/:type', usercontrller.allusers);

/*********start create user*** */
router.get('/create/:type', function(req, res, next) {
  var type;
  if(req.params.type == 'client'){
    type = 'العملاء';
  }else if(req.params.type == 'traders'){
    type = 'التجار';
  }else if(req.params.type == 'deleveries'){
    type = 'المندوبين';
  }else{
    res.redirect('/admin');
  }
  res.render('users/create',{title : 'Create-User',type:type,type2:req.params.type, layout: 'layout/admin' });
});
router.post('/insert', usercontrller.Inseruser);
/*********end create user*** */
/*********start Edit user*** */
router.get('/edit/:type/:id', function(req, res, next) {
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
router.post('/update', usercontrller.updateuser);
/*********end Edit user*** */
/*********start Delete user*** */
router.get('/delete/:id', usercontrller.deleteuser);
/*********end Delete user*** */

module.exports = router;
