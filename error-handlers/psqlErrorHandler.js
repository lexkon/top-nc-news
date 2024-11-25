const psqlErrorHandler = (err, req, res, next) => {
    const psqlErrorCodes = {
        '22P02': { status: 400, msg: 'bad request' }
    }

    if (psqlErrorCodes[err.code]) {
        const { status, msg } = psqlErrorCodes[err.code]
        
        res.status(status).send({ msg })
    } else {
        next(err)
    }
}

module.exports = psqlErrorHandler