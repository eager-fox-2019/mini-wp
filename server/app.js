require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/');
const errorHandler = require('./middleware/errorhandler')

// local mongodb connection
// mongoose.connect('mongodb://localhost/miniwp', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// })
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.log("MongoDB can't connect"))

// atlas connection
mongoose.connect(process.env.ATLAS_URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log("MongoDB Atlas can't connect"))
  
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)
app.use(errorHandler);
  
const PORT = 3002;
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })