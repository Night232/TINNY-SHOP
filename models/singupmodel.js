const mongoose = require('../database/config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    profilepic: {
        type: String, 
        default: '',
    },
    password: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;