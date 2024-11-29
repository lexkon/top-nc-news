const express = require('express')
const apiRouter = require('./routes/api.router')
const { psqlErrorHandler, customErrorHandler, invalidURLHandler, serverErrorHandler } = require('./error-handlers')
const app = express()

app.use(express.json())

app.use('/api', apiRouter)

app.use(psqlErrorHandler)
app.use(customErrorHandler)
app.use(serverErrorHandler)
app.all('*', invalidURLHandler)

module.exports = app