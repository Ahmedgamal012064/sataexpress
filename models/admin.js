const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const adminSchema = mongoose.Schema({
    name: {type: String},
    imagePath: {type: String},
    email: {type: String, required: true},
    phone : {type: Number} ,
    whatsapp : {type: String} ,
    gmail : {type: String} ,
    facebook : {type: String} ,
    sitepercent : {type: Number} ,
    vendorpercent : {type: Number} ,
    deleverypercent : {type: Number} ,
    password: {type: String, required: true} ,
    type: {type: String, required: true} ,
    permission: {type: {
        addvendors        : Boolean ,
        editvendors       : Boolean ,
        delvendors        : Boolean ,
        addusers          : Boolean ,
        delusers          : Boolean ,
        editusers         : Boolean ,
        adddelevery       : Boolean ,
        editdelevery      : Boolean ,
        deldelevery       : Boolean ,
        editcat           : Boolean ,
        addcat            : Boolean ,
        delcat            : Boolean ,
        orders            : Boolean ,
        reports           : Boolean ,
        addnotifications  : Boolean ,
        editcoupns        : Boolean ,
        addcoupns         : Boolean ,
        delcoupns         : Boolean ,
        editlocations     : Boolean ,
        addlocations      : Boolean ,
        dellocations      : Boolean ,
    }} ,
},{ timestamps: true });


adminSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);