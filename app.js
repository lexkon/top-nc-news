const express = require('express')
const { getApi, getTopics, getArticleById, getArticles, getArticleComments, postComment } = require('./controllers')
const { psqlErrorHandler, customErrorHandler } = require('./error-handlers')
const app = express()

app.use(express.json())

app.get('/api', getApi)
app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getArticleComments)

app.post('/api/articles/:article_id/comments', postComment)

// Error handling
app.use(psqlErrorHandler)
app.use(customErrorHandler)
app.use('*', (_, res) => {
    res.status(404).send({ msg: 'not an endpoint' })
})

module.exports = app