const Hidden = require('../models/Hidden')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function (req, res) {
    try{
        const hidden = await Hidden.find()
        res.status(200).json(hidden)

    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try{
        const hidden = new Hidden({
            position: req.body.position
        })


        await hidden.save()
        res.status(200).json(hidden)

    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {

    try{
        console.log(req.params.id)
      await Hidden.deleteOne({position: req.params.id})
        res.status(200).json({
            message:'Позиция скрыта.'
        })

    }catch (e) {
        errorHandler(res, e)
    }
}