const express = require('express')
const router = express.Router()

router.use('/user', require('./user.js'))
router.use('/picture', require('./picture.js'))
router.use('/like', require('./like.js'))
router.use('/block', require('./block.js'))
router.use('/location', require('./location.js'))
module.exports = router
