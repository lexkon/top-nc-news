customErrorHandler = (err, req, res, next) => {
    console.error(err, "<-- err inside customErrorHandler")
    if (err.status && err.msg) {
        return res.status(err.status).send( {msg: err.msg})
    } else {
        next(err)
    }
}

module.exports = customErrorHandler