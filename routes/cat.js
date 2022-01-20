var express = require('express');
const csrf = require('csurf');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Cat = require('../models/cat');
const catcontroller  = require('../controller/catcontroller');

router.get('/', catcontroller.allcats);

router.get('/create', function(req, res, next) {
    res.render('cats/create', { title: 'Create-Cats', layout: 'layout/admin' });
});
router.post('/store', catcontroller.Insercats);

router.get('/edit/:id', function(req, res, next) {
    Cat.findOne({_id:req.params.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
    if(err){
        console.log(err);
        res.redirect('/admin/cats');
    }
        console.log(result);
        res.render('cats/edit',{title : 'Edit-Cats',cat : result, layout: 'layout/admin' });
});
});
router.post('/update', catcontroller.updatecats);

router.get('/delete/:id', catcontroller.deletecats);

module.exports = router;