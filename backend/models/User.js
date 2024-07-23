const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
    },
    lastName:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('users', userSchema)