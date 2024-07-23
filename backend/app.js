const express = require('express');
const authRoutes = require('./routse/auth')
const categoryRoutes = require('./routse/category')
const positionRouter = require('./routse/position')
const pastaRouter = require('./routse/pasta')
const sauceRouter = require('./routse/sauce')
const extraRouter = require('./routse/extra')
const hiddenRouter = require('./routse/hidden')
const bodyParser = require('body-parser')
const message = require('./send/send')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./config/keys')
const app = express()



mongoose.connect(keys.mongoURI,{
    dbName: keys.dbName,
    useNewUrlParser: true,
})
    .then(() => console.log("Mongo DB"))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extend: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRouter)
app.use('/api/pasta', pastaRouter)
app.use('/api/sauce', sauceRouter)
app.use('/api/extra', extraRouter)
app.use('/api/message', message.send)
app.use('/api/hidden', hiddenRouter)

module.exports = app