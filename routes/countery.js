var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Countery = require('../models/countery');
const counterycontrller  = require('../controller/counterycontroller');

router.get('/', counterycontrller.allcounteries);

router.get('/create', function(req, res, next) {
    res.render('countries/create', { title: 'Create-Counteries', layout: 'layout/admin' });
});
router.post('/store', counterycontrller.Insercountery);

router.get('/edit/:id', function(req, res, next) {
    Countery.findOne({_id:req.params.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
    if(err){
        console.log(err);
        res.redirect('/admin/countries');
    }
        console.log(result);
        res.render('countries/edit',{title : 'Edit-Countery',country : result, layout: 'layout/admin' });
});
});
router.post('/update', counterycontrller.updatecountery);

router.get('/delete/:id', counterycontrller.deletecountery);

module.exports = router;