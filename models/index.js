const {fetchArticles, fetchArticleById, fetchArticleComments} = require('./articles.model')
const { addComment } = require('./comments.model')
const { fetchTopics } = require('./topics.model')


module.exports = {
    fetchTopics,
    fetchArticles,
    fetchArticleById,
    fetchArticleComments,
    addComment
}