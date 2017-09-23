const express = require('express')
const router = express.Router()

router.use('/user', require('./user.js'))
router.use('/picture', require('./picture.js'))
module.exports = router
