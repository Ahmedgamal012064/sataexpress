const mongoose = require('mongoose');
const counterySchema = mongoose.Schema({
    name: {type: String, required: true},
    lat: {type: String, required: true},
    lang: {type: String, required: true},
});


module.exports = mongoose.model('Countery', counterySchema);