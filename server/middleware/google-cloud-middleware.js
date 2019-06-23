const gcsHelpers = require('../helpers/gcs');

const { storage } = gcsHelpers;

const DEFAULT_BUCKET_NAME = 'miniwp-storage'; // Replace with the name of your bucket

/**
 * Middleware for uploading file to GCS.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {*}
 */
exports.sendUploadToGCS = (req, res, next) => {
  // console.log("at gcs Middleware")
  // console.log(req.file)
  // console.log("------------that was req.file-------------")
  if (!req.file) {
    return next();
  }

  const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
  const bucket = storage.bucket(bucketName);
  const gcsFileName = `${Date.now()}-${req.file.originalname}`;
  const file = bucket.file(gcsFileName);

  // console.log("++++ storage start ++++")
  // console.log(storage)
  // console.log("----storage ends----")
  // console.log("------------ file ----------------------------")
  // console.log(file)
  // console.log("got the file")
  // console.log(file)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  // console.log(stream)

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsFileName;

    return file.makePublic()
      .then(() => {
        req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
        next();
      });
  });

  stream.end(req.file.buffer);
};