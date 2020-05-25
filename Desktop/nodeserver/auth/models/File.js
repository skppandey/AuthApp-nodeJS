const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    email:{
            type: String,
            unique: true,
            index: true,
            required: true
    },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
      });

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('File', fileSchema);