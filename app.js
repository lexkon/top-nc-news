const express = require('express')
const apiRouter = require('./routes/api.router')
const { psqlErrorHandler, customErrorHandler, invalidURLHandler, serverErrorHandler } = require('./error-handlers')
const app = express()
const cors = require('cors');

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)

app.use(psqlErrorHandler)
app.use(customErrorHandler)
app.use(serverErrorHandler)
app.all('*', invalidURLHandler)

module.exports = app