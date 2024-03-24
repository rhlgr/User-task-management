const mongoose = require('mongoose');
const userModel = new mongoose.Schema({
    name: String,
    email: String,
    nummber:String,
    id: String,
});

var user = mongoose.model('user', userModel);
module.exports = user;