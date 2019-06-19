const route = require('express').Router()
const userR = require('../routes/userRoutes')

route.use('/users',userR)

route.get('/*',(req,res)=> {
    console.log ('berhasil masuk routers')
    res.send('loh lolos semua')
})

module.exports = route