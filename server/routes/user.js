const router = require('express').Router()
const Users = require('../controllers/user')

router.post('/register', Users.create)
router.post('/login', Users.login)
router.post('/auth', Users.auth)

module.exports = router