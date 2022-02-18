var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Admin = require('../models/admin');
const Cat = require('../models/cat');
const Subcat = require('../models/subcat');
const City = require('../models/city');
const Countery = require('../models/countery');
const Coupon = require('../models/coupon');
const Goverment = require('../models/goverment');
const Notification = require('../models/notification');
const Order = require('../models/order');
const User = require('../models/user');
const senmessge  =  require("../middleware/sendmessage");

const admincontroller = require('../controller/admincontroller');

router.get('/', isLoggedIn,function(req, res, next) {
    var obj = {}; // {} will create an object  
    User.find({ type: "user" }).count(function(err, count){
        console.log('count users : ',count)
        obj['users'] = count;
    });
    User.find({type: "vendor"}).count(function(err, count){
        obj['vendors'] = count;
    });
    User.find({type: "delevery"}).count(function(err, count){
        obj['deleveries'] = count;
    });
    Countery.find().count(function(err, count){
        obj['counteries'] = count;
    });
    Coupon.find().count(function(err, count){
        obj['coupons'] = count;
    });
    Order.find().count(function(err, count){
        obj['orders'] = count;
    });
    Goverment.find().count(function(err, count){
        obj['goverments'] = count;
    });
    City.find().count(function(err, count){
        obj['cities'] = count;
    });
    Subcat.find().count(function(err, count){
        obj['subcat'] = count;
    });
    Cat.find().count(function(err, count){
        obj['cat'] = count;
    });
    console.log(obj);
    res.render('home', { title: 'Admin Home', counts:obj,layout: 'layout/admin' });
});
/////////////Start Notifications*/////////////////
router.get('/notifications', isLoggedIn,function(req, res, next) {
    Notification.find({type : { $exists: true, $ne: null }},(err , result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
        var success = req.flash('success-notify');
        res.render('notifications/index', { title: 'notifications',notifications : result, layout: 'layout/admin', success : success });
    }).populate('user');
});
router.post('/post-notifications', isLoggedIn,function(req, res, next) {
    User.find({type : req.body.type},"token",(err , result)=>{
        if(err){
            console.log(err);
        }
        if(result){
            result.forEach(function(resu,index,arr){
                senmessge(resu.token,req.body.title,req.body.body);
                var notification = new Notification({
                    title : req.body.title,
                    body  : req.body.body ,
                    user  : resu._id      ,
                    type  : req.body.type
                });
                notification.save();
            });
        }
    });
    req.flash('success-notify',"done");
    return res.redirect('/admin/notifications');
});
/////////////End Notifications*/////////////////
router.get('/reports', isLoggedIn,function(req, res, next) {
    res.render('reports/index', { title: 'reports', layout: 'layout/admin' });
});
router.get('/Profile', isLoggedIn,function(req, res, next) {
    res.render('auth/profile', { title: 'Admin Profile', layout: 'layout/admin' });
});

router.post('/Update-Profile', isLoggedIn,function(req, res, next) {
    res.send('update profile');
});

router.get('/permission', isLoggedIn,admincontroller.alladmins);


router.get('/permission/edit/:id', isLoggedIn,function(req, res, next) {
    Admin.findOne({_id:req.params.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/permission');
        }
            console.log(result);
            res.render('admins/edit',{title : 'Edit-Admin',country : result, layout: 'layout/admin' });
    });
});
router.post('/permission/update', isLoggedIn,admincontroller.Inseradmins);


router.get('/permission/create', isLoggedIn,function(req, res, next) {
    res.render('admins/create', { title: 'Create-Admins', layout: 'layout/admin' });
});
router.post('/permission/store', isLoggedIn,admincontroller.updateadmins);

router.get('/delete/:id', isLoggedIn,admincontroller.deleteadmins);

router.get('/logout', isLoggedIn,function (req, res, next) {  //router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logOut();
    res.redirect('/Login');
});

function isLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        console.log(req.isAuthenticated());
        res.redirect('/Login');
        return ;
    }
    return next();
}

module.exports = router;