const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('index.ejs')
})

router.get('/product', (req,res) =>{
    res.render('product')
})

router.get('/contack', (req,res) =>{
    res.render('contack')
})

module.exports = router