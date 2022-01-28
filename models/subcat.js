const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const subcatSchema = mongoose.Schema({
    name: {type: String, required: true},
    cat: {type: Schema.Types.ObjectId ,  ref: 'Cat'},
    photo: {type: String},
    
},{ timestamps: true });


module.exports = mongoose.model('Subcat', subcatSchema);