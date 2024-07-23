const Sauce = require('../models/Sauce')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const sauceAll = await Sauce.find()
        res.status(200).json(sauceAll)

    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) {
    try {
        const sauce = await Sauce.findById({_id: req.params.id})
        res.status(200).json(sauce)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const sauce = new Sauce({
            name: req.body.name,
            cost: req.body.cost,
            description: req.body.description,
            image: req.file ? req.file.path : ''
        })
        await sauce.save()
        res.status(201).json(sauce)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Sauce.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Соус был удален'
        })
    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name,
        cost: req.body.cost,
        description: req.body.description
    }
    if (req.file) {
        updated.image = req.file.path
    }
    try {
        const sauce = await Sauce.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(sauce)
    }catch (e) {
        errorHandler(res, e)
    }
}