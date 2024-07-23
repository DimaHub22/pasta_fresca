const express = require('express')
const controller = require('../controllers/extra')
const passport = require("passport");
const upload = require("../middleware/upload");
const router = express.Router()


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/',upload.single('image') ,controller.create)
router.patch('/:id',upload.single('image') ,controller.update)
router.delete('/:id',controller.remove)

module.exports = router