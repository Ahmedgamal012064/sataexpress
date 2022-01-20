const User = require('../models/user');

allusers = function(req, res, next) {
    //get all users
      User.find({},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/');
        }
        console.log(result);
        var type;
        if(req.params.type == 'client'){
            type = 'العملاء';
        }else if(req.params.type == 'traders'){
            type = 'التجار';
        }else if(req.params.type == 'deleveries'){
            type = 'المندوبين';
        }else{
            res.redirect('/admin');
        }
        res.render('users/index',{title:'All Users',type:type, users : result,layout: 'layout/admin' });
    });
}; //all users

Inseruser = function(req, res, next) {
    User.findOne({email:req.body.email},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/');
        }
        if(result){
            console.log('Email is already found');
            return ;
        }

        const user = new User({
            name : req.body.name,
            type : req.body.type,
            email : req.body.email,
            password : req.body.password,
        });
        user.save((error,result)=>{
            if(error){
                console.log(error );
                res.redirect('/');
            }
            console.log(result);
            res.redirect('/users');
        });
    });
}; //Insert User

updateuser = function(req, res, next) {
    const id = req.body.id;
    const updateuser = {
        email : req.body.email,
        type : req.body.type,
        name : req.body.name,
        password : req.body.password,
    }
    User.updateOne({_id:id}, {$set : updateuser},(error , result)=>{
        if(error){
            console.log(error );
            res.redirect('/');
            return ;
        }
        console.log(result);
        res.redirect('/users');
    });
}; //Updateuser

deleteuser = function(req, res, next) {
    const id = req.params.id;
    User.deleteOne({_id:id},(error,result)=>{
        if(error){
            console.log(error );
            res.redirect('/');
            return ;
        }
            console.log(result);
            res.redirect('/users');
    });
}; //Delete


module.exports = 
{
    allusers   : allusers ,
    Inseruser  : Inseruser ,
    updateuser : updateuser ,
    deleteuser : deleteuser
}