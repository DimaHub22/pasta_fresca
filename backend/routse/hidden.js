const express = require('express')
const controller = require('../controllers/hidden')
const router = express.Router()
const passport = require('passport')

router.get('/',controller.getAll)
router.post('/',passport.authenticate('jwt',{session:false}), controller.create)
router.delete('/:id',passport.authenticate('jwt',{session:false}),controller.remove)

module.exports = router