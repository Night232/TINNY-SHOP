const mongoose = require('../database/config')

const contackSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    des: {
        type: String
    },
})

const Contack = mongoose.model('contack', contackSchema)
module.exports = Contack