const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    countery: {type: String},
    type: {type: String, required: true},
    status: {type: Number, required: true},
    password: {type: String, required: true} ,
    birthday: {type: Date},
    gender: {type: String},
    token: {type: String},
    images: {type: String},
    address : {type: String} ,
    lat: {type: String},
    lang: {type: String},
},{ timestamps: true });


userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
