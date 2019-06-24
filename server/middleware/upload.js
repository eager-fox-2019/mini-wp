const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: './max_service_account.json'
}); // Creates a client
const bucketName = process.env.BUCKET;

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`
}

function uploadToGCS (req, res, next) {
  if (!req.file) {
    return next();
  }
  const bucket = storage.bucket(bucketName);
  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    },
    resumable: false
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
}

module.exports = uploadToGCS;