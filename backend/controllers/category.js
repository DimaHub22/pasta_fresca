
const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require("../utils/errorHandler");


module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (e) {
        console.log(e)
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const positions = await Category.findById({
            _id: req.params.id,
        })
        res.status(200).json(positions)

    } catch (e) {
        errorHandler(res, e)

    }
}

module.exports.remove = async function (req, res) {
    try {
        await Category.deleteOne({_id: req.params.id});
        await Position.deleteMany({category: req.params.id});
        res.status(200).json({
            message: "Категория удалена."
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const category = new Category({
            name: req.body.name
        })
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }

}

module.exports.update = async function (req, res) {
    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(category)

    } catch (e) {
        errorHandler(res, e)
    }
}