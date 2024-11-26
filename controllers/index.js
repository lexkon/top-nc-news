const { getApi} = require('./app.controller')
const { getTopics } = require('./topics.controller')
const { getArticles, getArticleById, getArticleComments } = require('./articles.controller')

module.exports = {
    getApi,
    getTopics,
    getArticles,
    getArticleById,
    getArticleComments
}