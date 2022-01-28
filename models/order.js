const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const orderSchema = mongoose.Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId ,  ref: 'User'},
    delvery: {type: Schema.Types.ObjectId ,  ref: 'User'},
    trader: {type: Schema.Types.ObjectId ,  ref: 'User'},
    status: {type: Number, required: true},
    price: {type: Number, required: true},
    reply: {type: String, required: true},
    lat: {type: String, required: true},
    lang: {type: String, required: true},

    username: {type: String, required: true},
    userphone: {type: String, required: true},
    userlat: {type: String, required: true},
    userlang: {type: String, required: true},
    useremail: {type: String, required: true},
    usernotes: {type: String, required: true},
    
},{ timestamps: true });


module.exports = mongoose.model('Order', orderSchema);