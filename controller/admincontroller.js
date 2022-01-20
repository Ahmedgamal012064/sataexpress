const Admin = require('../models/admin');

alladmins = function(req, res, next) {
    //get all admins
    Admin.find({},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/permission');
        }
        console.log(result);
        res.render('admins/index', { title: 'Admins',admins : result, layout: 'layout/admin' });
    });
}; //all admins 

Inseradmins = function(req, res, next) {
    const admin = new Admin({
        name : req.body.name
    });
    admin.save((error,result)=>{
        if(error){
            console.log("Error :"+ error );
            res.redirect('/admin/permission');
        }
        console.log(result);
        res.redirect('/admin/permission');
    });
}; //Insert Admins

updateadmins = function(req, res, next) {
    const id = req.body.id;
    const updateadmin = {
        name : req.body.name,
    }
    Admin.updateOne({_id:id}, {$set : updateadmin},(error , result)=>{
        if(error){
            console.log(error );
            res.redirect('/admin/permission');
            return ;
        }
        console.log(result);
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