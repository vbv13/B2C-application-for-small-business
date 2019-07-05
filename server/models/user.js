const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
        email:{
            type: String,
            require: true,
            trim: true,
            unique: 1
        },
        password:{
            type: String,
            require: true,
            minlength: 5            
        },
        name:{
            type: String,
            require: true,
            maxlength: 100           
        },
        lastname:{
            type: String,
            require: true,
            maxlength: 100                 
        },
        cart:{
            type: Array,
            default: []
        },
        history:{
            type: Array,
            default: []            
        },
        role:{
            type: Number,
            default: 0
        },
        token:{
            type: String
        }
})

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function(err,salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)   //null as first argument, cause we don't get err from bcrypt.compare, comparison hitted so isMatch is true
    })
}

userSchema.methods.generateToken = (cb) => {
    //console.log(this)  //should be a user, if not create a variable with this pointing to a user
    let token = jwt.sign(this._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })

}

const User = mongoose.model('User', userSchema);

module.exports = { User }
