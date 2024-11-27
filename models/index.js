const {fetchArticles, fetchArticleById, fetchArticleComments, modifyArticle} = require('./articles.model')
const { addComment, deleteCommentById } = require('./comments.model')
const { fetchTopics } = require('./topics.model')


module.exports = {
    fetchTopics,
    fetchArticles,
    fetchArticleById,
    fetchArticleComments,
    modifyArticle,
    addComment,
    deleteCommentById
}