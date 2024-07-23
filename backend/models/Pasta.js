const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pastaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    image:{
        type:String,
        default: ''
    },
})

module.exports = mongoose.model('pastes', pastaSchema)