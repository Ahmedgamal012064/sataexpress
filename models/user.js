const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    type: {type: String, required: true},
    status: {type: Number, required: true},
    password: {type: String, required: true} ,
    address: {type: String, required: true},
    image: {type: String, required: true},
});


userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);