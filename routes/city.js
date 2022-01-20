var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const City = require('../models/city');
const Goverment = require('../models/goverment');
const citiescontrller  = require('../controller/citiescontroller');

router.get('/', citiescontrller.allcities);

router.get('/create', function(req, res, next) {
    Goverment.find({},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/cities');
        }
            console.log(result);
            res.render('cities/create', { title: 'Create-Cities',cats : result,layout: 'layout/admin' });
    });
});
router.post('/store', citiescontrller.Insercities);

router.get('/edit/:id', function(req, res, next) {
    var goverments = '' ;
    Goverment.find({},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/cities');
        }
        goverments = result;
    });
    City.findOne({_id:req.params.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
    if(err){
        console.log(err);
        res.redirect('/admin/cities');
    }
        console.log(result);
        res.render('cities/edit',{title : 'Edit-City',city : result,goverments:goverments ,layout: 'layout/admin' });
    });
});
router.post('/update', citiescontrller.updatecities);

router.get('/delete/:id', citiescontrller.deletecities);

module.exports = router;