const {
    Storage
} = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_PROJECT_ID; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = process.env.KEYFILE_PATH; // Replace with the path to the downloaded private key
const BUCKET_NAME = process.env.GOOGLE_BUCKET_NAME

const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});
const bucket = storage.bucket(BUCKET_NAME)

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`
}
const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        console.log(req.file, 'xxxxxxxxxxxxxxxxxxx');
        return next()
    }

    //FILENAME TO SAVE IN GCS
    const gcsname = Date.now() + req.file.originalname
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    //IF UPLOAD FAILED...
    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    //IF UPLOAD FINISHED SUCCESSFULLY...
    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
            next()
        })
    })

    stream.end(req.file.buffer)
}

const Multer = require('multer')
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
}