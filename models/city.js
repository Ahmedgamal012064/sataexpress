const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const citySchema = mongoose.Schema({
    name: {type: String, required: true},
    cat: {type: Schema.Types.ObjectId ,  ref: 'Goverment'},
    
});


module.exports = mongoose.model('City', citySchema);