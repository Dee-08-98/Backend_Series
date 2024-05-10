const express = require('express')
const app = express()

app.use(express.json({limit:"55kb"}))
app.use(express.urlencoded({extended : true , limit:"55kb"}))
app.use(express.static("Public"))
 
const cors = require('cors')
app.use(cors())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const  route  = require('./routes/routes')
app.use('/api',route)

module.exports = app






