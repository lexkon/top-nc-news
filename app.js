const express = require('express')
const { getApi, getTopics, getArticleById, getArticles, getArticleComments, postComment, patchArticle, deleteComment } = require('./controllers')
const { psqlErrorHandler, customErrorHandler, invalidURLHandler, serverErrorHandler } = require('./error-handlers')
const app = express()

app.use(express.json())

app.get('/api', getApi)
app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getArticleComments)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.delete('/api/comments/:comment_id', deleteComment)

// Error handling
app.use(psqlErrorHandler)
app.use(customErrorHandler)
app.use(serverErrorHandler)
app.all('*', invalidURLHandler)

module.exports = app