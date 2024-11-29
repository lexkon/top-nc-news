const express = require('express')
const { getArticles, getArticleById, getArticleComments, postComment, patchArticle } = require('../controllers')

const articlesRouter = express.Router()

articlesRouter.get('/', getArticles)
articlesRouter.get('/:article_id', getArticleById)
articlesRouter.get('/:article_id/comments', getArticleComments)
articlesRouter.post('/:article_id/comments', postComment)
articlesRouter.patch('/:article_id', patchArticle)

module.exports = articlesRouter
