const GoogleCloudBucket = require('@google-cloud/storage');
const Storage = GoogleCloudBucket.Storage;

const GOOGLE_CLOUD_PROJECT_ID = process.env.GCS_PROJECT_ID; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = process.env.GCS_KEYFILE_PATH; // Replace with the path to the downloaded private key

const newStorage = new Storage({
projectId: GOOGLE_CLOUD_PROJECT_ID,
keyFilename: GOOGLE_CLOUD_KEYFILE,
});

/**
* Get public URL of a file. The file must have public access
* @param {string} bucketName
* @param {string} fileName
* @return {string}
*/
exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;
