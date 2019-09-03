const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userScheduma = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, 
    profileImageUrl: {
        type: String
    }
})

const User = mongoose.model('User', userScheduma);

module.exports = User;