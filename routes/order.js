var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Order = require('../models/order');
const ordercontroller  = require('../controller/ordercontroller');

router.get('/', isLoggedIn,ordercontroller.allorders);

router.get('/pending', isLoggedIn,ordercontroller.pendingorders);

router.get('/finished', isLoggedIn,ordercontroller.finishedorders);

router.get('/cancel', isLoggedIn,ordercontroller.cancelorders);

router.get('/finish/:id', isLoggedIn,ordercontroller.finishorders);


router.get('/detail/:id', isLoggedIn,ordercontroller.detailsorders);

function isLoggedIn(req, res, next) {
        if(!req.isAuthenticated()) {
                console.log(req.isAuthenticated());
                res.redirect('/Login');
                return ;
        }
        return next();
}

module.exports = router;