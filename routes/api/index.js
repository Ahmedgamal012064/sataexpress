var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');

router.post('/Signup', function(req, res, next) {
    res.status(200).json({
        'status' : true ,
        'meg'    : 'welcome to api Ahmed'
    });
});

router.post('/Login', function(req, res, next) {
    res.status(200).json({
        'status' : true ,
        'meg'    : 'welcome to api Ahmed'
    });
});

module.exports = router;