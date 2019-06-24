const router = require("express").Router()
const user = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')
const gcs = require('../middlewares/GCS')

router.post('/register',gcs.multer.single("image_url"), gcs.sendUploadToGCS, user.register)
router.post('/login',user.login)
router.post('/signingoogle', user.GoogleSignIn)

router.use(authenticate)
router.get('/me',user.readOne)
router.patch('/me',gcs.multer.single("image_url"), gcs.sendUploadToGCS,user.update)

module.exports = router