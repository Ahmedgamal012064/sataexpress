const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const govermentSchema = mongoose.Schema({
    name: {type: String, required: true},
    cat: {type: Schema.Types.ObjectId ,  ref: 'Countery'},
    
},{ timestamps: true });


module.exports = mongoose.model('Goverment', govermentSchema);