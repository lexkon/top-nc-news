const express = require('express')
const { getApi, getTopics, getArticleById, getArticles, getArticleComments } = require('./controllers/app.controller')
const { psqlErrorHandler, customErrorHandler } = require('./error-handlers')
const app = express()

// Uncomment for POST/PATCH 
// app.use(express.json())

app.get('/api', getApi)
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getArticleComments)

// Error handling
app.use(psqlErrorHandler)
app.use(customErrorHandler)
app.use('*', (_, res) => {
    res.status(404).send({ msg: 'not an endpoint' })
})

module.exports = app