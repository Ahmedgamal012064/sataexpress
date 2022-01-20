const mongoose = require('mongoose');
const counterySchema = mongoose.Schema({
    name: {type: String, required: true},
});


module.exports = mongoose.model('Countery', counterySchema);