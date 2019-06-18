module.exports = function (err, req, res, next) {
    let status = err.status || 500
    let msg = err.msg || 'Internal server error'

    res.status(status).json({
        message: msg,
    });
}