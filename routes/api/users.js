var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const Order = require('../../models/order');
var Notification = require("../../models/notification");
const jwt   = require('jsonwebtoken');
const authapi   = require('../../middleware/authapi');
const senmessge  =  require("../../middleware/sendmessage");

router.post('/create-order', authapi,function(req, res, next) {
    const order = new Order({
        name   : req.body.name,
        user   : req.user.id,
        trader : req.body.vendorid,
        status : "pendingvendor" ,
        weight : req.body.weight,
        cat    : req.body.cat,
        price  : parseInt(req.body.weight) * 10 ,
        username  : req.body.username,
        userphone : req.body.userphone,
        useremail : req.body.useremail,
        usernotes : req.body.usernotes,
        lat : req.body.lat,
        lang: req.body.lang,
    });
    order.save().
    then(result=>{
        User.findOne({_id:req.body.vendorid},'token',(err , result)=>{
            if(err){
                return res.status(400).json({
                    'status' : false ,
                    'data'   : err ,
                    'meg'    : 'error'
                });
            }
            if(result){
                senmessge(result.token,"order send to you","open app to see more details");
                var notification = new Notification({
                    title: "order send to you",
                    body: "open app to see more details",
                    user: req.body.vendorid,
                });
                notification.save();
            }
        });
        return res.status(200).json({
            'status' : true ,
            'meg'    : 'order created Successfully'
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

router.get('/orders-user',authapi,function(req, res, next) {
    Order.find({user:req.user.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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
    }).populate('trader');
});

router.get('/orders-vendor',authapi,function(req, res, next) {
    Order.find({trader:req.user.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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
    }).populate('user');
});

router.get('/orders-delevery',authapi,function(req, res, next) {
    Order.find({delvery:req.user.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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
    }).populate('user');
});

router.get('/notifications',authapi,function(req, res, next) {
    // var notification = new Notification({
    //     title: "order send to you",
    //     body: "open app to see more details",
    //     user: req.user.id,
    // });
    // return notification.save();
    Notification.find({user:req.user.id},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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


router.get('/vendors',authapi,function(req, res, next) {
    User.find({_id:{$ne : req.user.id} , type : "vendor"},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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

module.exports = router;
