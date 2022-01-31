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
    if(!req.body.vendorid){
        const order = new Order({
            name   : req.body.name,
            user   : req.user.id,
            status : "pendingdelevery" ,
            weight : req.body.weight,
            cat    : req.body.cat,
            price  : parseInt(req.body.weight) * 10 ,
            username  : req.body.username,
            userphone : req.body.userphone,
            useremail : req.body.useremail,
            usernotes : req.body.usernotes,
            address :  req.body.address,
            lat : req.body.lat,
            lang: req.body.lang,
            address2 :  req.body.address2,
            lat2 : req.body.lat2,
            lang2: req.body.lang2
        });
        order.save().
        then(result=>{
            User.find({type : "delevery"},"token",(err , result)=>{
                if(err){
                    console.log(err);
                }
                if(result){
                result.forEach(function(resu,index,arr){
                    senmessge(resu.token,"You have new Order","open app to see more details");
                    var notification = new Notification({
                        title: "You have new Order",
                        body: "open app to see more details",
                        user: resu._id,
                    });
                    notification.save();
                });
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
        
    }else{
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
            address :  req.body.address,
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
                }
                var notification = new Notification({
                    title: "order send to you",
                    body: "open app to see more details",
                    user: req.body.vendorid,
                });
                notification.save();
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
    }
});

router.get('/orders-user/:status',authapi,function(req, res, next) {
    Order.find({user:req.user.id , status : req.params.status},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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
    Order.find({trader:req.user.id,status : "pendingdelevery"},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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

router.get('/orders-vendor-accept',authapi,function(req, res, next) {
    Order.find({trader:req.user.id,status : "accept"},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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
    }).populate('delevery');
});

router.get('/orders-vendor-pending',authapi,function(req, res, next) {
    Order.find({trader:req.user.id,status:"pendingvendor"},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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

router.get('/orders-delevery/:status',authapi,function(req, res, next) {
    Order.find({delvery:req.user.id , status : req.params.status},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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
    }).populate('user').populate('trader');
});

router.get('/orders-delevery-pending',authapi,function(req, res, next) {
    Order.find({status : "pendingdelevery"},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
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
    }).populate('user').populate('trader');
});

router.get('/notifications',authapi,function(req, res, next) {
    //return senmessge("fvPUyg1kzEHfrW_PvdjyVN:APA91bF40oR3LsbH3ZqpPgk-YtHLRy8sCx4u6HVEk7PyoPjB-B1k9yDcKkqhoxTp4RC5pgQDSfsBaz2xQWHiLf-4jj44emstKSWYB-4Arv5hDGw5cLL1CF97vFfppL1yBaVJ3In3LBLo","order send to you","open app to see more details");
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

router.post('/request-order-vendor', authapi,function(req, res, next) {
    const id = req.body.id;
    if(req.body.status == 'cancel'){
        Order.updateOne({_id:id}, {$set : {status : "cancel"}},(error , result)=>{
            if(error){
                return res.status(400).json({
                    'status' : false ,
                    'data'   : error ,
                    'meg'    : 'error'
                });
            }
            User.findOne({_id : result.user},"token",(err , rest)=>{
            if(rest){
		        senmessge(rest.token,"vendor Cancel Your Order","open app to see more details");
		    }
		    var notification = new Notification({
		        title: "vendor Cancel Your Order",
		        body: "open app to see more details",
		        user: result.user,
		    });
		    notification.save();
            });
            return res.status(200).json({
                'status' : true ,
                'meg'    : 'successfully Cancel order' 
            });
        });
    }else if(req.body.status == 'accept'){
        Order.updateOne({_id:id}, {$set : {status : "pendingdelevery"}},(error , result)=>{
            if(error){
                return res.status(400).json({
                    'status' : false ,
                    'data'   : error ,
                    'meg'    : 'error'
                });
            }
            User.findOne({_id : result.user},"token",(err , rest)=>{
            if(rest){
		    senmessge(rest.token,"vendor Accept Your Order","open app to see more details");
		    }
		    var notification = new Notification({
		        title: "vendor Accept Your Order",
		        body: "open app to see more details",
		        user: result.user,
		    });
		    notification.save();
            });
            User.find({type : "delevery"},"token",(err , result)=>{
                if(err){
                    console.log(err);
                }
                if(result){
                result.forEach(function(resu,index,arr){
                    senmessge(resu.token,"You have new Order","open app to see more details");
                    var notification = new Notification({
                        title: "You have new Order",
                        body: "open app to see more details",
                        user: resu._id,
                    });
                    notification.save();
                });
                }
            });
            return res.status(200).json({
                'status' : true ,
                'meg'    : 'successfully accept order'
            });
        });
    }
});

router.post('/request-order-delevery', authapi,function(req, res, next) {
    const id = req.body.id;
    const iddelevery = req.user.id;
    Order.updateOne({_id:id}, {$set : {status : "accept", delvery : iddelevery}},(error , result)=>{
        if(error){
            return res.status(400).json({
                'status' : false ,
                'data'   : error ,
                'meg'    : 'error'
            });
        }
        User.findOne({_id : result.user},"token",(err , rest)=>{
        if(rest){
		    senmessge(rest.token,"delvery Accept Your Order","open app to see more details");
		}
		var notification = new Notification({
		    title: "delvery Accept Your Order",
		    body: "open app to see more details",
		    user: result.user,
		});
		notification.save();
        });
        return res.status(200).json({
            'status' : true ,
            'meg'    : 'successfully accept order'
        });
    });
});


router.post('/request-order-user', authapi,function(req, res, next) {
    const id = req.body.id;
    const iduser = req.user.id;
    Order.updateOne({_id:id}, {$set : {status : req.body.status, user : iduser}},(error , result)=>{
        if(error){
            return res.status(400).json({
                'status' : false ,
                'data'   : error ,
                'meg'    : 'error'
            });
        }
         User.findOne({_id : result.user},"token",(err , rest)=>{
           if(rest){
		senmessge(rest.token,"user "+req.body.status+" Order","open app to see more details");
		}
		var notification = new Notification({
		    title: "user "+req.body.status+" Order",
		    body: "open app to see more details",
		    user: result.user,
		});
		notification.save();
        });
         User.findOne({_id : result.trader},"token",(err , rest)=>{
           if(rest){
		senmessge(rest.token,"user "+req.body.status+" Order","open app to see more details");
		}
		var notification = new Notification({
		    title: "user "+req.body.status+" Order",
		    body: "open app to see more details",
		    user: result.trader,
		});
		notification.save();
        });
	User.findOne({_id : result.delvery},"token",(err , rest)=>{
	  if(rest){	
		senmessge(rest.token,"user "+req.body.status+" Order","open app to see more details");
		}
		var notification = new Notification({
		    title: "user "+req.body.status+" Order",
		    body: "open app to see more details",
		    user: result.delvery,
		});
		notification.save();
		
        });
        return res.status(200).json({
            'status' : true ,
            'meg'    : 'successfully finished order'
        });
    });
});

module.exports = router;
