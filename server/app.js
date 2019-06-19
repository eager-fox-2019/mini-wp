if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const multer = require('multer')
const app = express()

const { errorHandler } = require('./middlewares/error-handlers')
const routeIndex = require('./routes')
const Port = process.env.PORT
const mongoUrl = process.env.ATLAS_CONNECT

// connect mongodb
mongoose.connect('mongodb://localhost:27017/mini_wp_db', { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected");  
});

// setting multer storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', routeIndex)
// // route upload
// app.post('/uploadphoto', upload.single('picture'), (req, res) => {
//   var img = fs.readFileSync(req.file.path);
//   var encode_image = img.toString('base64');
  
//   // Define a JSONobject for the image attributes for saving to database
//   var finalImg = {
//     contentType: req.file.mimetype,
//     image:  new Buffer(encode_image, 'base64')
//   };
//   db.collection('quotes').insertOne(finalImg, (err, result) => {
//     console.log(result)

//     if (err) return console.log(err)

//     console.log('saved to database')
//     res.redirect('/')
  
    
//   })
// })

app.use(errorHandler)

app.listen(Port, () => {
  console.log(`Listening to port Port ${Port}`);
})

