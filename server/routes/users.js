const router = require('express').Router()
const controllerUser = require('../controllers/controlUsers')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authUser

// /api/users
router.get('/', controllerUser.findAll)
router.post('/register', controllerUser.create)
router.post('/login', controllerUser.login)
router.post('/googleSignin', controllerUser.googleSignin)
router.post('/fblogin', controllerUser.fbSignin)

router.use(isAuthenticated)
router.get('/current', isAuthorized, controllerUser.current)
router.patch('/', isAuthorized, controllerUser.update)
router.delete('/', isAuthorized, controllerUser.delete)

// router.delete('/forceDelete/:userId', controllerUser.delById)

module.exports = router