'use strict'
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const routes = require('./routes/index.js')
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
 
app.use('/api', routes);

const errHandler = require('./helpers/errHandler.js')
app.use((err, req, res, next) => {
	let errorDetail = errHandler(err)
	res.status(errorDetail.status).json(errorDetail.message)
})

app.listen(port, () => 
	console.log(`Server Starts on ${port}`))