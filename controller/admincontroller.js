const Admin = require('../models/admin');

alladmins = function(req, res, next) {
    //get all admins
    Admin.find({},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/permission');
        }
        console.log(result);
        var success = req.flash('success-admin');
        res.render('admins/index', { title: 'Admins',admins : result, layout: 'layout/admin'  , success : success});
    });
}; //all admins 

Inseradmins = function(req, res, next) {
    const admin = new Admin({
        name   : req.body.name ,
        type   : req.body.type ,
        email  : req.body.email ,
        password : new Admin().encryptPassword(req.body.password),
        permission      : {
            viewvendors  : req.body.vendors ? true : false ,
            addvendors   : req.body.vendors ? true : false ,
            viewusers    : req.body.users ? true : false ,
            addusers     : req.body.users ? true : false ,
            viewdelevery : req.body.deleveries ? true : false ,
            adddelevery  : req.body.deleveries ? true : false ,
            viewcat      : req.body.cats ? true : false ,
            addcat       : req.body.cats ? true : false ,
            orders       : req.body.orders ? true : false ,
            reports      : req.body.reports ? true : false ,
            addnotifications : req.body.notifications ? true : false ,
            viewcoupns  : req.body.coupons ? true : false ,
            addcoupns   : req.body.coupons ? true : false ,
        } 
    });
    admin.save((error,result)=>{
        if(error){
            console.log("Error :"+ error );
            res.redirect('/admin/permission');
        }
        console.log(result);
        req.flash('success-admin',"done");
        res.redirect('/admin/permission');
    });
}; //Insert Admins

updateadmins = function(req, res, next) {
    const id = req.body.id;
    const updateadmin = {
        name   : req.body.name  ,
        type   : req.body.type  ,
        email  : req.body.email ,
        password : new Admin().encryptPassword(req.body.password),
        permission      : {
            viewvendors  : req.body.vendors ? true : false ,
            addvendors   : req.body.vendors ? true : false ,
            viewusers    : req.body.users ? true : false ,
            addusers     : req.body.users ? true : false ,
            viewdelevery : req.body.deleveries ? true : false ,
            adddelevery  : req.body.deleveries ? true : false ,
            viewcat      : req.body.cats ? true : false ,
            addcat       : req.body.cats ? true : false ,
            orders       : req.body.orders ? true : false  ,
            reports      : req.body.reports ? true : false ,
            addnotifications : req.body.notifications ? true : false ,
            viewcoupns  : req.body.coupons ? true : false ,
            addcoupns   : req.body.coupons ? true : false ,
        } 
    }
    Admin.updateOne({_id:id}, {$set : updateadmin},(error , result)=>{
        if(error){
            console.log(error );
            res.redirect('/admin/permission');
            return ;
        }
        console.log(result);
        req.flash('success-admin',"done");
        res.redirect('/admin/permission');
    });
}; //Updat Admins

deleteadmins = function(req, res, next) {
    const id = req.params.id;
    Admin.deleteOne({_id:id},(error,result)=>{
        if(error){
            console.log(error );
            res.redirect('/admin/permission');
            return ;
        }
            console.log(result);
            res.redirect('/admin/permission');
    });
}; //Delete

module.exports = 
{
    alladmins    : alladmins ,
    Inseradmins  : Inseradmins ,
    updateadmins : updateadmins ,
    deleteadmins : deleteadmins
}