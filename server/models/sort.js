const mongoose = require('mongoose');

const sortSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
})

const Sort = mongoose.model('Sort', sortSchema);

module.exports = { Sort }