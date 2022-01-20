const mongoose = require('mongoose');
const couponSchema = mongoose.Schema({
    code: {type: Number, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: Date, required: true},
},{ timestamps: true });


module.exports = mongoose.model('Coupon', couponSchema);