var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Coupon = require('../models/coupon');
const couponcontroller  = require('../controller/couponcontroller');

router.get('/', couponcontroller.allcoupons);

router.get('/create', function(req, res, next) {
    res.render('coupons/create', { title: 'Create-Coupons', layout: 'layout/admin' });
});
router.post('/store', couponcontroller.Insercoupons);

router.get('/edit/:id', function(req, res, next) {
    Coupon.findOne({_id:req.params.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
    if(err){
        console.log(err);
        res.redirect('/admin/coupons');
    }
        console.log(result);
        res.render('coupons/edit',{title : 'Edit-Coupon',coupon : result, layout: 'layout/admin' });
});
});
router.post('/update', couponcontroller.updatecoupons);

router.get('/delete/:id', couponcontroller.deletecoupons);

module.exports = router;