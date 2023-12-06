const mongoose = require('../database/config');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;