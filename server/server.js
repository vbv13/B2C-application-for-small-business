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
const { Brand } = require('./models/brand');
const { Sort } = require('./models/sort');
const { Product } = require('./models/product');

//Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//=====================
//                 PRODUCTS
//=====================

app.post('/api/product/shop', (req, res)=>{

    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }


    Product.
    find(findArgs).
    populate('brand').
    populate('sorts').
    sort([[sortBy, order]]).
    skip(skip).
    limit(limit).
    exec((err, articles) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })

})

// BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=100
app.get('/api/product/articles', (req, res) => {

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.
    find().
    populate('brand').
    populate('wood').
    sort([[sortBy, order]]).
    limit(limit).
    exec((err, articles) => {
        if(err) return res.status(400).send(err);
        res.send(articles)
    })
})


/// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get('/api/product/articles_by_id', (req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if(type === 'array') {
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map( item => {
            return mongoose.Types.ObjectId(item)
        })
    }    

    Product
    .find({ 'id': {$in:items}})      //such entry cause it can be one item or array of multiple items -we don't know
    .populate('brand')
    .populate('sort')
    .exec((err, docs) => {
        return res.status(200).send(docs)
    })
});

    

app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if(err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            article: doc
        })
    })
});

//=====================
//                 SORTS
//=====================

app.post('/api/product/sort', auth, admin, (req, res) => {
    const sort = new Sort(req.body);

    sort.save((err, doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            sort: doc
        })
    })
});

app.get('/api/product/sorts', (req, res) => {
    Sort.find({}, (err, sorts) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(sortes);
    })
})

//=====================
//                 BRAND
//=====================

app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if(err) return res.json({ success: false, err });
        res.status(200).json({
            success: true, 
            brand: doc
        })
    })
})

app.get('/api/product/brands', (req, res) => {
    Brand.find({}, (err, brands) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(brands)
    })
})



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
            success: true
            //userdata: doc
        })
    })
});

app.post('/api/users/login', (req, res) => {
        //find the email
        //check password
        //generate a token (if password is correct for specific email)
    User.findOne({'email':req.body.email}, (err,user) => {
        if(!user) return res.json({loginSuccess: false, message: 'Authoryzacja nie przebiegła pomyślnie, nie znaleźliśmy takiego emaila'});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({loginSuccess: false, message: 'Złe hasło'});

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, doc) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        }
    )
})

const port = process.env.PORT || 3002;

app.listen(port, ()=>{
    console.log(`Server running at ${port}`)
})