var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Order = require('../models/order');
const ordercontroller  = require('../controller/ordercontroller');

router.get('/', function(req, res, next) {
    res.render('orders/index', { title: 'Orders',layout: 'layout/admin' });
});


router.get('/detail/:id', function(req, res, next) {
        res.render('order/detail',{title : 'Detail-Order', layout: 'layout/admin' });
});

module.exports = router;