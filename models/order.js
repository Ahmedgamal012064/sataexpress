const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const orderSchema = mongoose.Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId ,  ref: 'User'},
    delvery: {type: Schema.Types.ObjectId ,  ref: 'Delevery'},
    trader: {type: Schema.Types.ObjectId ,  ref: 'Trader'},
    status: {type: Number, required: true},
    price: {type: Number, required: true},
    reply: {type: String, required: true},
    payway: {type: String, required: true},
    
},{ timestamps: true });


module.exports = mongoose.model('Order', orderSchema);