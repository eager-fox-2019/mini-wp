if (process.env.NODE_ENV == 'development'){
    require("dotenv").config();
}

const express = require("express");
const routes = require("./routes");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const errorHandler = require('./helpers/error-handler.js');

mongoose.connect('mongodb://localhost/mini-wp', {useNewUrlParser: true});

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/", routes);
app.use(errorHandler)

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`connected to localhost ${PORT}`);
});