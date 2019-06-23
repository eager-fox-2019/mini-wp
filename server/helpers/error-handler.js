const { bad, internal, notAuth } = require('../helpers/error.js');

module.exports = function (err, req, res, next) {
    console.log("masuk")
    if (err.code === 400) {
        res.status(400).json({
            message: `${bad}`
        })
    } else if (err.code === 401) {
        res.status(401).json({
            message: `${notAuth}`
        })
    } else if (err.code === 404) {
        res.status(404).json({
            message: `${err.message}`
        })
    } else if (err.name === 'ValidationError') {
        console.log(err)
        const errors = {
          message: err.message,
          path: err.path
        };
        res.status(400).json(errors);
    } else {
        console.log(err)
        res.status(500).json({
            message: `${internal}`
        })
    }
}