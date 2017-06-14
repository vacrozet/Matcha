const MongoClient = require('mongodb').MongoClient
const uuid = require('uuid')
const express = require('express')
const router = express.Router()

router.use('/user', require('./user.js'))

module.exports = router
