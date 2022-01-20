const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const adminSchema = mongoose.Schema({
    name: {type: String, required: true},
    imagePath: {type: String, required: true},
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
        viewvendors : Boolean ,
        addvendors  : Boolean ,
        viewusers   : Boolean ,
        addusers     : Boolean ,
        viewdelevery : Boolean ,
        adddelevery  : Boolean ,
        viewcat      : Boolean ,
        addcat       : Boolean ,
        orders       : Boolean ,
        reports      : Boolean ,
        viewcity     : Boolean ,
        addcity      : Boolean ,
        viewcountery : Boolean ,
        addcountery  : Boolean ,
        viewgovernment : Boolean ,
        addgovernment  : Boolean ,
        addnotifications : Boolean ,
        viewcoupns  : Boolean ,
        addcoupns   : Boolean
    }, required: true} ,
    date : {type: String, required: true} ,
});


adminSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);