if(process.env.NODE_ENV === "development"){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const db = mongoose.connection;
const port = process.env.PORT
const mongodbURL= process.env.ATLAS_CLIENT_ID
const routes = require('./routes/index')


mongoose.connect(mongodbURL, {useNewUrlParser: true, useCreateIndex: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database')
});

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/', routes)

app.use((err, req, res, next) =>{
    console.log(err)
    if(err.message){
        res.status(400).json(err.message)
    }else{
        res.status(500).json('Internal Server Error')
    }
})  

app.listen(port, () => console.log(`Listening on port ${port}`))