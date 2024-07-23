const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hiddenSchema = new Schema({
    position:{
        type:String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('hidden', hiddenSchema)