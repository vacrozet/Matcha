const express = require('express')
const router = express.Router()

router.use('/user', require('./user.js'))
router.use('/picture', require('./picture.js'))
router.use('/like', require('./like.js'))
module.exports = router
