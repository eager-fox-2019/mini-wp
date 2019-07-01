const router = require(`express`).Router();

const { sendUploadToGCS, multer } = require("../middlewares/uploadtocloud");

router.post("/uploadimg", multer.single("image"), sendUploadToGCS, function(
  req,
  res,
  next
) {
  if (req.file) {
    res.status(200).json(req.file.cloudStoragePublicUrl);
  } else {
    res.status(500).send("Unable to upload");
  }
});

module.exports = router;
