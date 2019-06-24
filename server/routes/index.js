const router = require('express').Router()
const gcs = require('../helpers/google-cloud-storage')
let axios = require('axios')
router.use('/users', require('./userRoutes.js'))
router.use('/articles', require('./artileRoutes.js'))
router.get('/news', (req, res, next) => {
    let url = 'https://newsapi.org/v2/top-headlines?' +
        'country=id&' +
        `apiKey=${process.env.NEWS_API_KEY}`;
    axios({
        url,
        method: "GET"
    }).then(({
        data
    }) => {
        console.log(data);
        res.json(data)
    }).catch(next)
})
router.use('/upload',
    gcs.multer.single('image'),
    gcs.sendUploadToGCS,
    (req, res, next) => {
        console.log(req.body);
        if (!req.file) {
            res.status(404).json({
                message: "no image selected"
            })
        }
        res.json({
            message: "image uploaded",
            link: req.file.cloudStoragePublicUrl
        })
    })
module.exports = router