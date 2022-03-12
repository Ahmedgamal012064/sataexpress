const mongoose = require('mongoose');
const counterySchema = mongoose.Schema({
    photo: {type: String, required: true},
    name: {type: String, required: true},
    name_en: {type: String, required: true},
    code: {type: String, required: true},
    lat: {type: String, required: true},
    lang: {type: String, required: true},
});


module.exports = mongoose.model('Countery', counterySchema);
