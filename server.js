const express = require('express');
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv').config()
const router = require('./routers/mainrouter')
const User = require('./models/singupmodel')
const passport = require('passport');

app.use(session({
    secret: '12345678900987654321', // กำหนดคีย์ลับที่ใช้ในการเข้ารหัสข้อมูล session
    resave: false,
    saveUninitialized: false 
}));

const getUserByUsername = async (req, res, next) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        req.foundUser = user;
        next();
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).send('Internal Server Error');
    }
};

router.get('/:username', getUserByUsername, (req, res) => {
    const foundUser = req.foundUser;
    if(foundUser) {
        res.render('profile', { user: foundUser });
    } else {
        res.redirect('/auth/singup')
    }
});


app.use(express.urlencoded({extended: false}))
app.use(express.urlencoded({extended: false}))
app.use(router)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT,()=>{
    console.log('server run is 8000 port') 
})