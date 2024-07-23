const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const controller = require('../controllers/category')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if (passwordResult) {

            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`,
                user:candidate.name
            })
        } else {
            res.status(401).json({
                message: "Пароли не совпадают. Попробуйте снова."
            })
        }

    } else {
        res.status(404).json({
            message: "Пользователь с таким email не найден"
        })
    }
}

module.exports.signup = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        res.status(409).json({
            message: "Такой email уже занят"
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {

            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.update = async function (req, res) {

    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password

    const updated = {
        password: bcrypt.hashSync(password, salt)
    }

    try {
        const candidate = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )

        res.status(200).json({
            message:"Пароль успешно обновлен"
        })
    } catch (e) {
        errorHandler(res, e)
    }

}