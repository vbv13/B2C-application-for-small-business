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


//=====================
//                 USERS
//=====================

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({ success:false, err });
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
});

const port = process.env.PORT || 3002;

app.listen(port, ()=>{
    console.log(`Server running at ${port}.`)
})