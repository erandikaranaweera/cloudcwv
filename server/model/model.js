const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { intersects } = require('semver');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    crypto : String,
    amount: Number,
    currency : String,
    total: Number,
    currentdatetime : {
        type: Date,
        default: Date.now
    },
    status : String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;