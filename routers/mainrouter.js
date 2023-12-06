const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Swal = require('sweetalert2');
const User = require('../models/singupmodel');
const multer = require('multer');
const path = require('path');
const Product = require('../models/productmodel')
const Admin = require('../models/signupadmib')
const Contack = require('../models/contackmodel')


router.get('/admin', async (req, res) => {
    try {
        const userCount = await User.countDocuments({});

        res.render('admin', { count: userCount })
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/loginadmin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userCount = await User.countDocuments({});

        const userAdmin = await Admin.findOne({ username });

        if (!userAdmin) {
            return res.send('ชื่อผู้ใช้ไม่พบ');
        }

        const isPasswordValid = await bcrypt.compare(password, userAdmin.password);

        if (!isPasswordValid) {
            return res.send('รหัสผ่านไม่ถูกต้อง');
        }

        req.session.userAdmin = {
            _id: userAdmin._id,
            username: userAdmin.username,
            email: userAdmin.email,
            password: userAdmin.password,
            profilepic: userAdmin.profilepic
        };

        const timeExpire = 30000

        req.session.username = userAdmin.username
        req.session.password = userAdmin.password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire

        console.log(userAdmin)
        res.render('admin', { user: req.session.userAdmin, count: userCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
});

router.get('/logoutadmin', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/loginadmin');
        }
    });
});

router.get('/admin/lo', (req, res) => {
    res.render('loginadmin')
})

router.get('/admin/re', (req, res) => {
    res.render('re')
})

router.post('/readmin', async (req, res) => {
    const username = req.body.usernameadmin
    const email = req.body.emailadmin
    const password = req.body.passwordadmin

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const adminsave = new Admin({
        username: username,
        email: email,
        password: hashedPassword
    });

    try {
        await adminsave.save();
        console.log('Admin saved successfully:', adminsave);

        res.status(201).send('Admin saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

})

router.get('/home-test', (req, res) => {
    res.render('home')
})

router.get('/', async (req, res) => {
    const user = req.session.user;
    if (user) {
        const products = await Product.find().exec();
        res.render('index.ejs', { user, products })
    } else {
        res.redirect('/auth/singup')
    }
})

router.get('/payments', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.render('payment', { user })
    } else {
        res.redirect('/auth/singup')
    }
})

router.get('/product', async (req, res) => {
    const user = req.session.user;
    if (user) {
        try {
            const products = await Product.find().exec();
            res.render('product', { products, user });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.redirect('/auth/singup');
    }
});


router.get('/contacks', async (req, res) => {

    const user = req.session.user;
    if (user) {
        res.render('contack', { user })
    } else {
        res.redirect('/auth/singin')
    }
})

router.post('/contack-all', async (req, res) => {

    const user = req.session.user;

    const contackInput = {
        name: req.body.name,
        email: req.body.email,
        des: req.body.des
    }
    let contack = new Contack({
        name: contackInput.name,
        email: contackInput.email,
        des: contackInput.des
    })

    try {
        await contack.save()
        console.log(contack)
        res.render('contack', { user })
    } catch (error) {
        console.error(error);
    }
});

router.get('/show-contack', async (req,res)=>{
    try {
        const contacks = await Contack.find().exec();
        res.render('show-contack', { contacks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/contack-edit', async (req, res) => {
    const edit_id = req.body.edit_id;
    try {
        const doc = await Contack.findOne({ _id: edit_id });
        res.render('editcontack', { contack: doc })
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/update-contack', async (req, res) => {
    const update_id = req.body.update_id;
    let contackdata = {
        name: req.body.name,
        email: req.body.email,
        des: req.body.des,
    };

    try {
        const update = await Contack.findByIdAndUpdate(update_id, contackdata, { useFindAndModify: false });
        if (!update) {
            console.error('Contack not found for update.');
            res.status(404).send('Contack not found for update.');
            return;
        }
        console.log('Contack updated successfully:', update);
        res.send('อัตเดพแล้ว');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/auth/singup', (req, res) => {
    res.render('singup')
})

router.get('/auth/singin', (req, res) => {
    res.render('singin')
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.send('ชื่อผู้ใช้ไม่พบ');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.send('รหัสผ่านไม่ถูกต้อง');
        }

        req.session.user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            profilepic: user.profilepic
        };

        res.cookie('user', user, { maxAge: 900000, httpOnly: true });
        res.cookie('user_id', user._id, { maxAge: 900000, httpOnly: true });
        res.cookie('username', user.username, { maxAge: 900000, httpOnly: true });
        res.cookie('profilepic', user.profilepic, { maxAge: 900000, httpOnly: true });

        console.log(user)
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.send('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
});

router.post('/insert', async (req, res) => {
    if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).send('ข้อมูลไม่ถูกต้อง');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const datau = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const newUser = new User({
        username: datau.name,
        email: datau.email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        console.log(newUser);
        res.redirect('/auth/singin')
    } catch (error) {
        console.error(error);
        res.send('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
});

async function getUserByUsername(username) {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
}

router.get('/profile', (req, res) => {
    const user = req.session.user;

    if (user) {
        res.render('profile', { user });
    } else {
        redirect('/auth/singup')
    }
});


const uploadpic = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profiles')
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extension);
    }
});

const upload = multer({
    storage: uploadpic
});


router.post('/edit-profile', upload.single('fileprofile'), async (req, res) => {
    try {
        const user = req.session.user;

        const { username } = req.body;
        const fileprofile = req.file;

        user.username = username;

        if (fileprofile) {
            user.profilepic = fileprofile.filename;
        }

        await User.findByIdAndUpdate(user._id, {
            username: user.username,
            profilepic: user.profilepic,
        });

        console.log(user);
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.send('เกิดข้อผิดพลาดในการแก้ไขโปรไฟล์');
    }
});

router.get('/add-product', (req, res) => {
    const userAdmin = req.session.userAdmin;

    if (!userAdmin) {
        return res.redirect('/loginadmin');
    }
    res.render('addproduct')
})

const uploadfireproduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extension);
    }
});

const upproduct = multer({
    storage: uploadfireproduct
})

router.post('/product', upproduct.single('productpic'), async (req, res) => {
    const dataproducts = {
        name: req.body.name,
        price: req.body.price,
        linkproduct: req.body.linkproduct,
        productpic: req.file.filename
    }
    let product = new Product({
        nameproduct: dataproducts.name,
        price: dataproducts.price,
        linkproduct: dataproducts.linkproduct,
        productpic: dataproducts.productpic
    })

    try {
        await product.save()
        console.log(product)
        res.render('addproduct')
    } catch (error) {
        console.error(error);
    }
})

router.get('/manage', async (req, res) => {
    const userAdmin = req.session.userAdmin;

    if (!userAdmin) {
        return res.redirect('/loginadmin');
    }

    try {
        const products = await Product.find().exec();
        res.render('manage', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id, { useFindAndModify: false });
        res.redirect('/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/editproduct', async (req, res) => {
    const edit_id = req.body.edit_id;
    try {
        const doc = await Product.findOne({ _id: edit_id });
        res.render('form-edit-product', { product: doc })
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/update-product', async (req, res) => {
    const update_id = req.body.update_id;
    let productdata = {
        nameproduct: req.body.nameproduct,
        price: req.body.price,
        linkproduct: req.body.linkproduct,
    };

    try {
        const update = await Product.findByIdAndUpdate(update_id, productdata, { useFindAndModify: false });
        if (!update) {
            console.error('Product not found for update.');
            res.status(404).send('Product not found for update.');
            return;
        }
        console.log('Product updated successfully:', update);
        res.redirect('/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router