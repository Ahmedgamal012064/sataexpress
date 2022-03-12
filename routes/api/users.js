var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const Order = require('../../models/order');
const Address = require('../../models/address');
const Admin = require('../../models/admin');
var Notification = require("../../models/notification");
const jwt   = require('jsonwebtoken');
const authapi   = require('../../middleware/authapi');
const senmessge  =  require("../../middleware/sendmessage");

router.post('/create-order', authapi,function(req, res, next) {
    if(!req.body.vendorid){
        const order = new Order({
            name      : req.body.name,
            user      : req.user.id,
            status    : "pendingdelevery" ,
            weight    : req.body.weight,
            cat       : req.body.cat,
            price     : req.body.price ,
            username  : req.body.username,
            userphone : req.body.userphone,
            useremail : req.body.useremail,
            usernotes : req.body.usernotes,
            address   : req.body.address,
            lat       : req.body.lat,
            lang      : req.body.lang,
            address2  : req.body.address2,
            lat2      : req.body.lat2,
            lang2     : req.body.lang2 ,
        });
        order.save().
        then(result=>{
            User.find({type : "delevery"},"token",(err , result)=>{
                if(err){
                    console.log(err);
                }
                if(result){
                result.forEach(function(resu,index,arr){
                    senmessge(resu.token,"You have new Order | لديك طلب جديد","open app to see more details |  افتح الطبيق لرؤية الطلب ");
                    var notification = new Notification({
                        title_en: "You have new Order",
                        title: "لديك طلب جديد",
                        body_en: "some one make a new order",
                        body: "قام احد الاشخاص بطلب توصيل جديد",
                        user: resu._id,
                        type :"user"
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
                    senmessge(result.token,"order send to you | لديك طلب جديد","open app to see more details | افتح الطبيق لرؤية الطلب");
                }
            });
            var notification = new Notification({
                title_en: "order send to you",
                title: "لديك طلب جديد",
                body_en: "some one make a new order",
                body: "قام احد الاشخاص بطلب توصيل جديد",
                user: req.body.vendorid,
                type :"user"
            });
            notification.save();
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
                senmessge(rest.token,"vendor Cancel Your Order | المتجر قام بالغاء الطلب","open app to see more details | افتح الطبيق لرؤية الطلب");
            }
            });
            var notification = new Notification({
               title_en: "vendor Cancel Your Order",
		title: "المتجر قام بالغاء الطلب",
		body_en: "vendor Cancel Your Order",
		body: "المتجر قام بالغاء الطلب",
		user: result.user,
		type :"user"
            });
            notification.save();
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
                senmessge(rest.token,"vendor Accept Your Order | المتجر قام بالموافقة علي الطلب","open app to see more details | افتح الطبيق لرؤية الطلب");
            }
            });
            var notification = new Notification({
                title_en: "vendor Accept Your Order",
		title: "المتجر قام بالموافقة الطلب",
		body_en: "vendor Accept Your Order",
		body: "المتجر قام بالموافقة الطلب",
	        user: result.user,
		type :"user"
     
            });
            notification.save();
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
    Order.updateOne({_id:id}, {$set : {status : req.body.status, delvery : iddelevery}},(error , result)=>{
        if(error){
            return res.status(400).json({
                'status' : false ,
                'data'   : error ,
                'meg'    : 'error'
            });
        }
        User.findOne({_id : result.user},"token",(err , rest)=>{
        if(rest){
            senmessge(rest.token,"delvery "+req.body.status+" Your Order  | المندوب "+req.body.status+" طلبكم","open app to see more details | افتح الطبيق لرؤية الطلب");
        }
        });
        var notification = new Notification({
			title:  "المندوب "+req.body.status+" طلبكم",
			title_en: "delvery "+req.body.status+" Your Order",
			body: "المندوب "+req.body.status+" طلبكم",
			body_en: "delvery "+req.body.status+" Your Order",
			user: result.user,
			type :"user"
		});
		notification.save();
        return res.status(200).json({
            'status' : true ,
            'meg'    : 'successfully accept order'
        });
    });
});


router.post('/request-order-user', authapi,function(req, res, next) {
    const id = req.body.id;
    const iduser = req.user.id;
    var updateorder = {
        status : req.body.status ,
        rate   : req.body.rate ,
        notes  : req.body.notes
    };
    
    Order.updateOne({_id:id}, {$set : updateorder},(error , result)=>{
        if(error){
            return res.status(400).json({
                'status' : false ,
                'data'   : error ,
                'meg'    : 'error'
            });
        }
    
        User.findOne({_id : result.trader},"token",(err , rest)=>{
        if(rest){
            senmessge(rest.token,"user "+req.body.status+" Order |  العميل "+req.body.status+" طلبكم","open app to see more details | افتح الطبيق لرؤية الطلب");
		}
		var notification = new Notification({
			title:  "العميل "+req.body.status+" طلبكم",
			title_en:  "user "+req.body.status+" Order",
			body: "العميل "+req.body.status+" طلبكم",
			body_en: "user "+req.body.status+" Your Order",
		        user: result.trader,
			type :"user"
		  
		});
		notification.save();
        });
	User.findOne({_id : result.delvery},"token",(err , rest)=>{
	if(rest){	
		senmessge(rest.token,"user "+req.body.status+" Order |  العميل "+req.body.status+" طلبكم","open app to see more details | افتح الطبيق لرؤية الطلب");
		}
		var notification = new Notification({
		       title:  "العميل "+req.body.status+" طلبكم",
			title_en:  "user "+req.body.status+" Order",
			body: "العميل "+req.body.status+" طلبكم",
			body_en: "user "+req.body.status+" Your Order",
		        user: result.delvery,
			type :"user"
		});
		notification.save();
		
        });
        return res.status(200).json({
            'status' : true ,
            'meg'    : 'successfully'
        });
    });
});

//////////////////////Update Profile/////////////////////////////////
router.post('/update-profile', authapi,function(req, res, next) {
    const id = req.user.id;
    const updateuser = {
        name      : req.body.name ,
        phone     : req.body.phone,
        gender    : req.body.gender,
        birthday  : req.body.birthday,
        address   : req.body.address ,
        lat       : req.body.lat ,
        lang      : req.body.lang ,
    }
    User.updateOne({_id:id}, {$set : updateuser},(error , result)=>{
        if(error){
            console.log(error );
            return res.status(400).json({
                'status' : false ,
                'data'   : error ,
                'meg'    : 'error'
            });
        }
        console.log(result);
        return res.status(200).json({
            'status' : true ,
            'meg'    : 'successfully Update Profile'
        });
    });
});

router.post('/update-email', authapi,function(req, res, next) {
    const id = req.user.id;
    const updateuser = {
        email     : req.body.email,
    }
    User.updateOne({_id:id}, {$set : updateuser},(error , result)=>{
        if(error){
            console.log(error );
            return res.status(400).json({
                'status' : false ,
                'data'   : error ,
                'meg'    : 'error'
            });
        }
        console.log(result);
        return res.status(200).json({
            'status' : true ,
            'meg'    : 'successfully Update Email'
        });
    });
});

router.post('/update-password', authapi,function(req, res, next) {
    const id = req.user.id;
    //if(new User().validPassword(req.body.oldpass)){
        const updateuser = {
            password : new User().encryptPassword(req.body.newpass),
        }
        User.updateOne({_id:id}, {$set : updateuser},(error , result)=>{
            if(error){
                console.log(error );
                return res.status(400).json({
                    'status' : false ,
                    'data'   : error ,
                    'meg'    : 'error'
                });
            }
            console.log(result);
            return res.status(200).json({
                'status' : true ,
                'meg'    : 'successfully Update Password'
            });
        });
    // }else{
    //     return res.status(200).json({
    //         'status' : false ,
    //         'meg'    : 'Old Password wrong'
    //     });
    // }
});


router.post('/Add-Addresses', authapi,function(req, res, next) {

        const address = new Address({
            name    : req.body.name    ,
            email   : req.body.email   ,
            phone   : req.body.phone   ,
            address : req.body.address ,
            lat     : req.body.lat     ,
            lang    : req.body.lat     ,
            user    : req.user.id 
        });
        address.save().
        then(result=>{
            return res.status(200).json({
                'status' : true ,
                'meg'    : 'Successfully Add Address'
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

router.get('/All-Addresses', authapi,function(req, res, next) {

    Address.find({user:req.user.id},(err , result)=>{
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


router.get('/wallet',authapi,function(req, res, next) {

    var price = 0;
    Order.find({delvery:req.user.id},(err , result)=>{
        if(err){
            return res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        result.forEach(element => {
            console.log(element);
            price += element.price; 
        });
    });
    Admin.findOne({email : "admin@gmail.com"},"sitepercent",(err , result)=>{
        if(err){
            return res.status(400).json({
                'status' : false ,
                'data'   : err ,
                'meg'    : 'error'
            });
        }
        console.log(result);
        User.updateOne({_id:req.user.id}, {$set : {wallet :  price * result.sitepercent/100}},(error , result)=>{});
        return res.status(200).json({
            'status' : true ,
            'data'   : price * result.sitepercent/100 ,
            'meg'    : 'successfully'
        });
    });
});

module.exports = router;
