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
    });
}; //all orders  



module.exports = 
{
    allorders    : allorders ,
}