const router = require('express').Router()
const userController = require('../controllers/user')
const Multer = require('multer');
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

router.post('/login',userController.signIn)
router.post('/register', multer.single('image'), gcsMiddlewares.sendUploadToGCS, userController.signUp)
router.post('/google',userController.gSignIn)

module.exports = router