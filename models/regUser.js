const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const regUserSchema = new mongoose.Schema({
    email: String,
    username: String,
    hash: String,
    salt: String
});



regUserSchema.plugin(plm, {usernameQueryFields:['email']});

const regUser = mongoose.model('regUser', regUserSchema,'regUsers');

module.exports = regUser;

