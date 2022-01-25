const passport        = require('passport');
const Admin = require('../models/admin');
const { check, validationResult } = require('express-validator');
const localStrategy   = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local-signin',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},(req, email, password, done)=>{

    Admin.findOne({'email': email}, function (err, user) {
        if(err) {
            return done(err);
        }
        if(!user) {
            return done(null, false, req.flash('login-error', 'Wrong email or password'));
        }
        if( !user.validPassword(password)) {
            return done(null, false, req.flash('login-error', 'Wrong password'));
        }
        console.log(user);
        return done(null, user);
    })
}));


passport.use('local-signup',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},(req, email, password, done)=>{

    Admin.findOne({'email': email}, function (err, user) {
        if(err) {
            return done(err);
        }
        if(user) {
            return done(null, false, req.flash('signup-error', 'This Email already excit'));
        }
        const newuser = new  User({
            email : email ,
            password : new User().encryptPassword(password) ,
        });
        newuser.save((err , user)=>{
            if(err){
                return done(err);
            }
            return done(null,user);
        });
    })
}));