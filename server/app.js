const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const index = require('./router/index')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

let connection = process.env.ATLAS_CONNECTION ||'mongodb://localhost:27017/mini-wp'  
mongoose.connect(connection, {useNewUrlParser: true})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', index)

app.listen(port, ()=>console.log('listening to port :3000'))    
