const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const uniqueValidator = require('mongoose-unique-validator');

// User Schema
const detailSchema = mongoose.Schema({
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
    contact: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    },
    sports: {
        type: String,
        required: true
    }
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Detail', detailSchema);