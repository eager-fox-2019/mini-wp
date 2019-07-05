const router = require('express').Router()
const connect = require('../helpers/connect.js')
const userRoutes = require('./users')
const articleRoutes = require('./articles')

//connect to mongoose
router.use((req,res,next) => {
	connect()
		.then(() => next())
		.catch(next)
})

router.use('/users', userRoutes)
router.use('/articles', articleRoutes)

module.exports = router