const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const positionsAll = await Position.find()

        res.status(200).json(positionsAll)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
        })
        res.status(200).json(positions)

    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    const position = new Position({
        name: req.body.name,
        cost: req.body.cost,
        description: req.body.description,
        image: req.file ? req.file.path : '',
        category: req.body.category
    })
    try {

        await position.save()
        res.status(201).json(position)

    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    try {
        await Position.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Позиция была удалена'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function (req, res) {

    const updated = {
        name: req.body.name,
        cost: req.body.cost,
        description: req.body.description,
        category: req.body.category
    }
    if (req.file) {
        updated.image = req.file.path
    }
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(position)

    } catch (e) {
        errorHandler(res, e)
    }
}