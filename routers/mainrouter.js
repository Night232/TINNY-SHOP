const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('index.ejs')
})

router.get('/payments', (req,res)=>{
    res.render('payment')
})

router.get('/product', (req,res) =>{
    res.render('product')
    res.status(404).sendFile(__dirname + 'images/404.png');
})

router.get('/contack', (req,res) =>{
    res.render('contack')
})

router.get('/auth/singup', (req,res)=> {
    res.render('singup')
})

router.get('/auth/singin', (req,res)=> {
    res.render('singin')
})

router.get('/profile', (req,res)=> {
    res.render('profile')
})

module.exports = router