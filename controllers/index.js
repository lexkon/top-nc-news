const { getApi} = require('./app.controller')
const { getTopics } = require('./topics.controller')
const { getArticles, getArticleById, getArticleComments } = require('./articles.controller')
const { postComment } = require('./comments.controller')

module.exports = {
    getApi,
    getTopics,
    getArticles,
    getArticleById,
    getArticleComments,
    postComment
}