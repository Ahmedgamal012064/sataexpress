var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Cat = require('../models/cat');
const catcontroller  = require('../controller/catcontroller');

router.get('/', isLoggedIn,catcontroller.allcats);

router.get('/create', isLoggedIn,function(req, res, next) {
    res.render('cats/create', { title: 'Create-Cats', layout: 'layout/admin' });
});
router.post('/store', isLoggedIn,catcontroller.Insercats);

router.get('/edit/:id', isLoggedIn,function(req, res, next) {
    Cat.findOne({_id:req.params.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
    if(err){
        console.log(err);
        res.redirect('/admin/cats');
    }
        console.log(result);
        res.render('cats/edit',{title : 'Edit-Cats',cat : result, layout: 'layout/admin' });
});
});
router.post('/update', isLoggedIn,catcontroller.updatecats);

router.get('/delete/:id', isLoggedIn,catcontroller.deletecats);

function isLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        console.log(req.isAuthenticated());
        res.redirect('/Login');
        return ;
    }
    return next();
}

module.exports = router;