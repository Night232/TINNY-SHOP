const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DATABASE, {

  }).then(()=>{
    console.log('เชื่อมต่อ database mongoose สำเร็จ')
  }).catch((err)=>{
    console.log(err,'เชื่อมต่อ database mongoose ไม่สำเร็จ')
  })

module.exports = mongoose