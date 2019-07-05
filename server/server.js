const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());     //to parse JSON, whenever we get a request, we gonna be able to read it
app.use(cookieParser());

//Models
const { User }  = require('./models/user');

//Middlewares
const { auth } = require('./middleware/auth');


//=====================
//                 USERS
//=====================

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({ success:false, err });
        res.status(200).json({
            success: true,
            //userdata: doc
        })
    })
});

app.post('/api/users/login', (req, res) => {
        //find the email
        //check password
        //generate a token (if password is correct for specific email)
    User.findOne({'email':req.body.email}, (err,user) => {
        if(!user) return res.json({loginSuccess: false, message: 'Authorization failed, we did not found such an email'});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({loginSuccess: false, message: 'Wrong password'});

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })
})

const port = process.env.PORT || 3002;

app.listen(port, ()=>{
    console.log(`Server running at ${port}.`)
})