const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const orderSchema = mongoose.Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId ,  ref: 'User'},
    delvery: {type: Schema.Types.ObjectId ,  ref: 'User'},
    trader: {type: Schema.Types.ObjectId ,  ref: 'User'},
    status: {type: String, required: true},
    price: {type: Number, required: true},
    reply: {type: String},
    weight: {type: Number, required: true },
    cat: {type: Schema.Types.ObjectId ,  ref: 'Cat'},

    username: {type: String, required: true},
    userphone: {type: String, required: true},
    useremail: {type: String, required: true},
    usernotes: {type: String, required: true},
    address: {type: String},
    lat: {type: String, required: true},
    lang: {type: String, required: true},
    address2 :  {type: String, required: true},
    lat2 : {type: String, required: true},
    lang2: {type: String, required: true} ,

    rate : {type: String, required: true} ,
    notes : {type: String, required: true} ,
    
},{ timestamps: true });


module.exports = mongoose.model('Order', orderSchema);
