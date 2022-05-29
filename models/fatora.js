const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const orderSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId ,  ref: 'User'},
    whocreate: {type: Schema.Types.ObjectId ,  ref: 'Admin'},
    datefrom : {type: Date},
    dateto : {type: Date},
    price: {type: Number, required: true},
    type: {type: String},
},{ timestamps: true });


module.exports = mongoose.model('Fatora', orderSchema);