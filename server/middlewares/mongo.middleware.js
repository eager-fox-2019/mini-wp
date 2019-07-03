
const { db_url } = require('../config/mongo.config')
const mongoose = require('mongoose')

function connect() {
    mongoose.connect(db_url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        dbName: process.env.DB_NAME
    }, function (error) {
        if (error) {
            throw new Error('database ga konek')
        } else {
            console.log('database connected')
        }
    })
}

module.exports = connect