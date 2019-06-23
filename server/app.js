require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/miniwp'
const cors = require('cors')
const port = 3000

mongoose.connect(url, {useNewUrlParser: true}, (err) => {
  if(err) console.log('error connecting mongoose')
  else console.log('connected to mongooose')
});

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/api', routes)

app.use((err, req, res, next) => {
  let status = err.status || 500
	let message = err.message
	res.status(status).json({
    message: message
	})
})

app.listen(port, () => { console.log('Listening to port ', port) })