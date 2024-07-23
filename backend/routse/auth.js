const express = require('express');
const controllers = require('../controllers/auth')
const router = express.Router();
const passport = require('passport')


router.post('/login',controllers.login);
router.post('/signup', controllers.signup)
router.patch('/:id',passport.authenticate('jwt',{session:false}), controllers.update)


module.exports = router