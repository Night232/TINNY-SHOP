const express = require('express');
const app = express()
const path = require('path')
const dotenv = require('dotenv').config()
const router = require('./routers/mainrouter')

app.use(router)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT,()=>{
    console.log('server run is 8000 port')
})