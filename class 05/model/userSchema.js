const mongoose = require("mongoose")

const schema =  mongoose.Schema({
    first_name : String,
    gender: String,
    age: Number
});

const userModel =  mongoose.model('users',schema)

module.exports = userModel