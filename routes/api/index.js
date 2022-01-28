var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Countery = require('../../models/countery');
const User     = require('../../models/user');
const Cat      = require('../../models/cat');
const jwt   = require('jsonwebtoken');
const JWT_SECRET = "sata express";

router.get('/counteries', function(req, res, next) {
    Countery.find({},'name',(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        console.log(result);
        res.status(200).json({
            'status' : true ,
            'data'   : result ,
            'meg'    : 'successfully'
        });
    });
});

router.get('/locations', function(req, res, next) {
    Countery.find({},'lat lang',(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        console.log(result);
        res.status(200).json({
            'status' : true ,
            'data'   : result ,
            'meg'    : 'successfully'
        });
    });
});

router.get('/cats', function(req, res, next) {
    Cat.find({},'name',(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        console.log(result);
        res.status(200).json({
            'status' : true ,
            'data'   : result ,
            'meg'    : 'successfully'
        });
    });
});


router.post('/login', function(req, res, next) {
    User.findOne({phone:req.body.phone},(err , result)=>{ 
        if(err){
            res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
       
        if(result){
            if( !result.validPassword(req.body.password)) {
                res.status(400).json({
                    'status' : false ,
                    'meg'    : 'Password Wrong'
                });
            }
            let token = jwt.sign({phone:req.body.phone},JWT_SECRET ,{expiresIn : '1h'});
            res.status(200).json({
                'status' : true ,
                'data'   : result ,
                'token'  : token ,
                'meg'    : 'login successfully'
            });
        }else{
            //check email
            res.status(400).json({
                'status' : false ,
                'meg'    : 'User Not Found'
            });
        }
    });
});

router.post('/signup-mobile', function(req, res, next) {
    User.findOne({phone:req.body.phone},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        if(result){
            res.status(200).json({
                'status' : false ,
                'meg'    : 'Phone is already found'
            });
        }

        res.status(200).json({
            'status' : true ,
            'meg'    : 'Success Verify Your Number'
        });
    });
});

router.post('/signup-verify-mobile', function(req, res, next) {
    if(req.body.code == '123456'){
        res.status(200).json({
            'status' : true ,
            'meg'    : 'mobile phone verify successfully'
        });
    }else{
        res.status(200).json({
            'status' : false ,
            'meg'    : 'code wrong'
        });
    }
});

router.post('/signup-complete', function(req, res, next) {
    User.findOne({email:req.body.email},(err , result)=>{
        if(err){
            res.status(500).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        if(result){
            res.status(200).json({
                'status' : false ,
                'meg'    : 'Email is already found'
            });
        }

        const user = new User({
            name : req.body.name,
            type : req.body.type,
            email : req.body.email,
            phone  : req.body.phone,
            countery : req.body.countery,
            status: 2,
            birthday: req.body.birthday,
            gender: req.body.gender,
            password : new User().encryptPassword(req.body.password),
        });
        user.save().
        then(result=>{
            let token = jwt.sign({phone  : req.body.phone},JWT_SECRET ,{expiresIn : '1h'});
            res.status(200).json({
                'status' : true ,
                'data'   : result ,
                'token'  : token ,
                'meg'    : 'Successfully signup'
            });
        }).
        catch(err=>{
            res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        });
    });
});



module.exports = router;