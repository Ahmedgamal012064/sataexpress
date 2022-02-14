const Order = require('../models/order');

allorders= function(req, res, next) {
    //get all orders
    Order.find({},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/orders');
        }
        console.log(result);
        res.render('orders/index', { title: 'Orders',orders : result, layout: 'layout/admin' });
    }).populate('trader').populate('delvery');
}; //all orders  


pendingorders= function(req, res, next) {
    //get all orders
    Order.find({status : "pendingdelevery"},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/pending');
        }
        console.log(result);
        res.render('orders/pending', { title: 'Orders-Pending',orders : result, layout: 'layout/admin' });
    }).populate('delvery');
}; //all orders 


finishedorders= function(req, res, next) {
    //get all orders
    Order.find({status : "finished"},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/finished');
        }
        console.log(result);
        res.render('orders/finished', { title: 'Orders-Finished',orders : result, layout: 'layout/admin' });
    }).populate('trader').populate('delvery');
}; //all orders


cancelorders= function(req, res, next) {
    //get all orders
    Order.find({status : "cancel"},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/cancel');
        }
        console.log(result);
        res.render('orders/cancel', { title: 'Orders-Cancel',orders : result, layout: 'layout/admin' });
    }).populate('trader').populate('delvery');
}; //all orders



module.exports = 
{
    allorders      : allorders ,
    pendingorders  : pendingorders ,
    finishedorders : finishedorders ,
    cancelorders   : cancelorders
}