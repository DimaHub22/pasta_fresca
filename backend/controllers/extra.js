const Extra = require('../models/Extra')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const extraAll = await Extra.find()
        res.status(200).json(extraAll)

    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) {
    try {
        const extra = await Extra.findById({_id: req.params.id})
        res.status(200).json(extra)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const extra = new Extra({
            name: req.body.name,
            cost: req.body.cost,
            description: req.body.description,
            image: req.file ? req.file.path : ''
        })
        await extra.save()
        res.status(201).json(extra)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Extra.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Добавка была удалена'
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
        const extra = await Extra.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(extra)
    }catch (e) {
        errorHandler(res, e)
    }
}