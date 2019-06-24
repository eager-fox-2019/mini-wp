module.exports = function (err, req, res, next) {
    console.log(err);
    if (err.name === "ValidationError") {
        let errors = Object.keys(err.errors)
        let objErr = {}
        errors.forEach(errorType => {
            objErr[errorType] = err.errors[errorType].message
        })
        res.status(400).json({
            errors: objErr,
            err,
            [err.name]: true,
            message: "Registration Failed"
        })
    } else if (err.name === 'JsonWebTokenError') {
        res.status(400).json({
            message: err.message,
            err,
            [err.name]: true
        })
    } else {
        let message = "internal server error"
        if (err.message) {
            message = err.message
        }
        res.status(err.code).json({
            message,
            err
        })
    }
}