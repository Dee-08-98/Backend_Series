const express = require('express')
const userRegister = require('../controllers/user')
const route = express.Router()

route.get('/register',userRegister)

module.exports = route