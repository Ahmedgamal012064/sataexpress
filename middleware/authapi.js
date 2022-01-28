const jwt   = require('jsonwebtoken');
const JWT_SECRET = "sata express";

const auth = (req , res , next) => {
    try{
        const token =  req.header('Authorization');
        let data = jwt.verify(token,JWT_SECRET);
        req.user = data;
        next();
    }catch(error){
        res.json({
            message : "Authentication Faild!"
        })
    }
}

module.exports = auth;