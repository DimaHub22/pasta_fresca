const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    cost:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        default: ''
    },
    image:{
        type:String,
        default: ''
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    }

})

module.exports = mongoose.model('positions', positionSchema)