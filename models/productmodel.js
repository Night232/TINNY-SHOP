const mongoose = require('../database/config')

const productsSchema = new mongoose.Schema({
    nameproduct: {
        type: String
    },
    price: {
        type: Number
    },
    linkproduct: {
        type: String
    },
    productpic: {
        type: String
    }
})

const Product = mongoose.model('products', productsSchema)
module.exports = Product