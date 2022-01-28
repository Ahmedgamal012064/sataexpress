const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const catSchema = mongoose.Schema({
    name: {type: String, required: true},
    photo: {type: String},
});


module.exports = mongoose.model('Cat', catSchema);