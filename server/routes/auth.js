const router = require('express').Router()

const auth = require('../controllers/auth')

router.post('/login', auth.login)
router.post('/google-login', auth.googleLogin)
router.post('/register', auth.register)

module.exports = router