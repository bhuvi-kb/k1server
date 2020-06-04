const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const regUserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})


regUserSchema.plugin(plm);

const regUser = mongoose.model('regUser', regUserSchema,'regUsers');

module.exports = regUser;

