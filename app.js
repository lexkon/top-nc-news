const express = require('express')
const { getApi, getTopics } = require('./controllers/app.controller')
const app = express()

// app.use(express.json())

app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.use((err, req, res, next) => {
    console.error(err, "err inside app.js")
    res.status(500).send({ msg: 'Something went wrong on the server' });
})

app.use('*', (_, res) => {
    res.status(404).send({ msg: 'not an endpoint' });
})

module.exports = app