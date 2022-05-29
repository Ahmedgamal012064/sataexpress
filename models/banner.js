const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const bannerSchema = mongoose.Schema({
    photo: {type: String},
},{ timestamps: true });


module.exports = mongoose.model('Banner', bannerSchema);