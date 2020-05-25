const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const uniqueValidator = require('mongoose-unique-validator');

// User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);