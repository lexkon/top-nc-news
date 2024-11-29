const {fetchArticles, fetchArticleById, fetchArticleComments, modifyArticle} = require('./articles.model')
const { addComment, deleteCommentById, modifyComment } = require('./comments.model')
const { fetchTopics } = require('./topics.model')
const { fetchUsers, fetchUserById } = require('./users.model')


module.exports = {
    fetchTopics,
    fetchArticles,
    fetchArticleById,
    fetchArticleComments,
    fetchUsers,
    fetchUserById,
    modifyArticle,
    addComment,
    modifyComment,
    deleteCommentById
}