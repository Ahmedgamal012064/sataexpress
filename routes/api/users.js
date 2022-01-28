var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const jwt   = require('jsonwebtoken');
const JWT_SECRET = "sata express";
// router.post('/auth',function(req,res,next){
//     let token = req.header('Authorization');
//     try{
//         let data = jwt.verify(token,JWT_SECRET);
//         res.json(data.phone);
//     }catch(err){
//         res.json({"msg" : "unauth"});
//     }
// });


module.exports = router;