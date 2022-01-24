var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Admin = require('../models/admin');
const admincontroller = require('../controller/admincontroller');

router.get('/', function(req, res, next) {
    res.render('home', { title: 'Admin Home', layout: 'layout/admin' });
});
router.get('/Profile', function(req, res, next) {
    res.render('auth/profile', { title: 'Admin Profile', layout: 'layout/admin' });
});

router.post('/Update-Profile', function(req, res, next) {
    res.send('update profile');
});

router.get('/permission', admincontroller.alladmins);


router.get('/permission/edit/:id', function(req, res, next) {
    Admin.findOne({_id:req.params.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/permission');
        }
            console.log(result);
            res.render('admins/edit',{title : 'Edit-Admin',country : result, layout: 'layout/admin' });
    });
});
router.post('/permission/update', admincontroller.Inseradmins);


router.get('/permission/create', function(req, res, next) {
    res.render('admins/create', { title: 'Create-Admins', layout: 'layout/admin' });
});
router.post('/permission/store', admincontroller.updateadmins);

router.get('/delete/:id', admincontroller.deleteadmins);

router.get('/logout', function (req, res, next) {  //router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/Login');
});

function isLoggedIn(req, res, next) {
if(req.isAuthenticated()) {
    return next();
}
res.redirect('/Login');
}

function notLoggedIn(req, res, next) {
if(!req.isAuthenticated()) {
    return next();
}
res.redirect('/admin');
}

module.exports = router;