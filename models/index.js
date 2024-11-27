const {fetchArticles, fetchArticleById, fetchArticleComments, modifyArticle} = require('./articles.model')
const { addComment, deleteCommentById } = require('./comments.model')
const { fetchTopics } = require('./topics.model')
const { fetchUsers } = require('./users.model')


module.exports = {
    fetchTopics,
    fetchArticles,
    fetchArticleById,
    fetchArticleComments,
    fetchUsers,
    modifyArticle,
    addComment,
    deleteCommentById
}