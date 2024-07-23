const Pasta = require('../models/Pasta')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const pastaAll = await Pasta.find()
        res.status(200).json(pastaAll)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const pasta = await Pasta.findById({_id: req.params.id})
        res.status(200).json(pasta)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const pasta = new Pasta({
            name: req.body.name,
            cost: req.body.cost,
            description: req.body.description,
            image: req.file ? req.file.path : ''
        })

        await pasta.save()
        res.status(201).json(pasta)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Pasta.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'Форма пасты была удалена'
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
    }
    if (req.file) {
        updated.image = req.file.path
    }
    try {
        const pasta = await Pasta.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(pasta)
    } catch (e) {
        errorHandler(res, e)
    }
}