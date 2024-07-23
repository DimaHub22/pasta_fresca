const mongoose = require('mongoose')
const Schema = mongoose.Schema

const extraSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
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

module.exports = mongoose.model('extras', extraSchema)