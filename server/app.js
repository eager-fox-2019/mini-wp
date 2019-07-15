require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3220
const routes = require('./routes/')
const errorHandler = require('./helpers/errHandler')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGGODB_URI, {useNewUrlParser: true})
.then(() =>{
      console.log('MongoDB connected')
})
.catch(err =>{
      console.log(err)
})
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log('this app running on port ' + port)
})
