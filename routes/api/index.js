var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Countery = require('../../models/countery');
const User     = require('../../models/user');
const Cat      = require('../../models/cat');
const upload   = require('../../middleware/upload');
const jwt   = require('jsonwebtoken');
const JWT_SECRET = "sata express";

router.get('/counteries', function(req, res, next) {
    Countery.find({},'name photo code',(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            return res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        console.log(result);
        return res.status(200).json({
            'status' : true ,
            'data'   : result ,
            'meg'    : 'successfully'
        });
    });
});

router.get('/locations', function(req, res, next) {
    Countery.find({},'name lat lang',(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            return res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        console.log(result);
        return res.status(200).json({
            'status' : true ,
            'data'   : result ,
            'meg'    : 'successfully'
        });
    });
});

router.get('/cats', function(req, res, next) {
    Cat.find({},'name',(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            return res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        console.log(result);
        return res.status(200).json({
            'status' : true ,
            'data'   : result ,
            'meg'    : 'successfully'
        });
    });
});


router.post('/login', function(req, res, next) {
    User.findOne({phone:req.body.phone},(err , result)=>{ 
        if(err){
            return res.status(400).json({
                'status' : false ,
                'error'   : err ,
                'meg'    : 'error'
            });
        }

        if(result){
            if( !result.validPassword(req.body.password)) {
                return res.status(400).json({
                    'status' : false ,
                    'meg'    : 'Password Wrong'
                });
            }
	    User.updateOne({_id:result._id}, {$set : {token : req.body.token }});
            let token = jwt.sign({id:result._id},JWT_SECRET ,{expiresIn : '1h'});
            return res.status(200).json({
                'status' : true ,
                'data'   : result ,
                'token'  : token ,
                'meg'    : 'login successfully'
            });
        }else{
            //check email
            return res.status(400).json({
                'status' : false ,
                'meg'    : 'User Not Found'
            });
        }
    });
});

router.post('/signup-mobile', function(req, res, next) {
    User.findOne({phone:req.body.phone},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            return res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        if(result){
            return res.status(200).json({
                'status' : false ,
                'meg'    : 'Phone is already found'
            });
        }

        return res.status(200).json({
            'status' : true ,
            'meg'    : 'Success Verify Your Number'
        });
    });
});

router.post('/signup-verify-mobile', function(req, res, next) {
    if(req.body.code == '123456'){
        return res.status(200).json({
            'status' : true ,
            'meg'    : 'mobile phone verify successfully'
        });
    }else{
        return res.status(200).json({
            'status' : false ,
            'meg'    : 'code wrong'
        });
    }
});

router.post('/signup-complete', upload.array('images[]',3),function(req, res, next) { //upload.single('image')
    User.findOne({email:req.body.email},(err , result)=>{
        if(err){
            return res.status(500).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        if(result){
            return res.status(200).json({
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
            token    : req.body.token ,
            address : req.body.address ,
            lat: req.body.lat ? req.body.lat  : 0 ,
            lang: req.body.lang ? req.body.lat  : 0,
        });
        // if(req.file){
        //     user.images = req.file.path;
        // }
        if(req.files){
            let path = '';
            req.files.forEach(function(files,index,arr){
                path = path + files.path + ',';
            });
            path = path.substring(0,path.lastIndexOf(","));
            user.images = path;
        }
        user.save().
        then(result=>{
            let token = jwt.sign({id  : user._id},JWT_SECRET ,{expiresIn : '1h'});
            return res.status(200).json({
                'status' : true ,
                'data'   : result ,
                'token'  : token ,
                'meg'    : 'Successfully signup'
            });
        }).
        catch(err=>{
            return res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        });
    });
});



module.exports = router;
