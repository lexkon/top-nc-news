const express = require('express')
const topicsRouter = require('./topics.router')
const articlesRouter = require('./articles.router')
const usersRouter = require('./users.router')
const commentsRouter = require('./comments.router')
const { getApi } = require('../controllers')

const apiRouter = express.Router()

apiRouter.get('/', getApi)
apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter
