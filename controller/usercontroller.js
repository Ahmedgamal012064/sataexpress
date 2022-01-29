const User = require('../models/user');

allusers = function(req, res, next) {
    //get all users
        var type;
        var type2;
        if(req.params.type == 'client'){
            type2 = "user";
            type = 'العملاء';
        }else if(req.params.type == 'traders'){
            type2 = "vendor";
            type = 'التجار';
        }else if(req.params.type == 'deleveries'){
            type2 = "delevery";
            type = 'المندوبين';
        }else{
            res.redirect('/admin');
        }
      User.find({type : type2},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/');
        }
        console.log(result);
        res.render('users/index',{title:'All Users',type:type, users : result,layout: 'layout/admin' });
    }).populate('countery');
}; //all users

Inseruser = function(req, res, next) {
    User.findOne({phone:req.body.phone},(err , result)=>{ // find({where(name : 'ahmed')},select('name email'),callback)
        if(err){
            console.log(err);
            res.redirect('/admin/users/'+req.body.type);
        }
        if(result){
            console.log('Phone is already found');
            req.flash('registeruser','Phone is already found');
            res.redirect('/admin/users/'+req.body.type);
        }

        const user = new User({
            name : req.body.name,
            type : req.body.type,
            email : req.body.email,
            phone : req.body.phone,
            password : new User().encryptPassword(req.body.password),
        });
        user.save((error,result)=>{
            if(error){
                console.log(error );
                res.redirect('/admin/users/'+req.body.type);
            }
            console.log(result);
            res.redirect('/admin/users/'+req.body.type);
        });
    });
}; //Insert User

updateuser = function(req, res, next) {
    const id = req.body.id;
    const updateuser = {
        email : req.body.email,
        phone : req.body.phone,
        name : req.body.name,
        password : new User().encryptPassword(req.body.password),
    }
    User.updateOne({_id:id}, {$set : updateuser},(error , result)=>{
        if(error){
            console.log(error );
            res.redirect('/');
            return ;
        }
        console.log(result);
        res.redirect('/admin/users/'+req.body.type);
    });
}; //Updateuser

deleteuser = function(req, res, next) {
    const id = req.params.id;
    User.deleteOne({_id:id},(error,result)=>{
        if(error){
            console.log(error );
            res.redirect('/admin/users/'+req.body.type);
            return ;
        }
            console.log(result);
            res.redirect('/admin/users/'+req.body.type);
    });
}; //Delete


module.exports = 
{
    allusers   : allusers ,
    Inseruser  : Inseruser ,
    updateuser : updateuser ,
    deleteuser : deleteuser
}