exports.psqlErrorHandler = (err, _, res, next) => {
    // console.log(err, "<-- err inside psqlErrorHandler")
    const psqlErrorCodes = {
        '22P02': { status: 400, msg: 'bad request' },
        '23503': { status: 400, msg: 'bad request' }
    }

    if (psqlErrorCodes[err.code]) {
        const { status, msg } = psqlErrorCodes[err.code]
        res.status(status).send({ msg })
    } else {
        next(err)
    }
}

exports.customErrorHandler = (err, _, res, next) => {
    // console.log(err, "<-- err inside customErrorHandler")
    if (err.status && err.msg) {
        return res.status(err.status).send({ msg: err.msg })
    } else {
        next(err)
    }
}

exports.serverErrorHandler = (err, _, res, next) => {
    // console.log(err, '<-- err in serverErrorHandler')
    res.status(500).send({ msg: 'internal server error' })
}

exports.invalidURLHandler = (_, res) => {
    res.status(404).send({ msg: 'not an endpoint' })
}