require('dotenv').config()
const express = require('express');
const app = express();
const router = require('./routes')
const cors = require('cors')
const volleyball = require('volleyball')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.connect((process.env.MONGOOSE_CONNECT_LOCAL || 'mongodb://localhost:27017/mwp'), { useNewUrlParser: true }, (err) => {
 if(err)console.log(`couldn't connect the mongo db`)
 else console.log(`connected to database on ${process.env.MONGOOSE_CONNECT_LOCAL}`)
});

app.use(express.json({limit:'2mb'}))
app.use(express.urlencoded({ limit:'2mb', extended: false }))


app.use(cors())
app.use(volleyball)
// app.use('/', (req, res, next) => {
//     res.send('hallo wp')
// });
app.use('/',router)
app.use("*",(req,res,next)=>{
    next({statusCode:404,message:'not found'})
})



app.use(function (error, req, res, next) {
    console.log(error)
    // if (error.fromRoute) console.log(error.fromRoute)
    if (!error.statusCode) error.statusCode = 500   
    if(error.errors){
        if (error.errors.email) { error.statusCode = 400; error.message = error.errors.email.message }
    }
    res.status(error.statusCode).json({ message: error.message, error });
});

app.listen(port, () => console.log(`listening on port ${port}`));

