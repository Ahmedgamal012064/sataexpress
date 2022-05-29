var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Coupon = require('../models/coupon');
const couponcontroller  = require('../controller/couponcontroller');

router.get('/', isLoggedIn,couponcontroller.allcoupons);

router.get('/create', isLoggedIn,function(req, res, next) {
     var permission = req.user.permission;
    res.render('coupons/create', { title: 'Create-Coupons',permission:permission, layout: 'layout/admin' });
});
router.post('/store', couponcontroller.Insercoupons);

router.get('/edit/:id', isLoggedIn,function(req, res, next) {
     var permission = req.user.permission;
    Coupon.findOne({_id:req.params.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
    if(err){
        console.log(err);
        res.redirect('/admin/coupons');
    }
        console.log(result);
        res.render('coupons/edit',{title : 'Edit-Coupon',coupon : result,permission:permission, layout: 'layout/admin' });
});
});
router.post('/update', isLoggedIn,couponcontroller.updatecoupons);

router.get('/delete/:id', isLoggedIn,couponcontroller.deletecoupons);

function isLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        console.log(req.isAuthenticated());
        res.redirect('/Login');
        return ;
    }
    return next();
}

module.exports = router;