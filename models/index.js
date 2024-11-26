const {fetchArticles, fetchArticleById, fetchArticleComments} = require('./articles.model')
const fetchTopics = require('./topics.model')

module.exports = {
    fetchArticles,
    fetchArticleById,
    fetchArticleComments,
    fetchTopics
}