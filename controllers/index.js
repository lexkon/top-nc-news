const { getApi } = require('./app.controller')
const { getTopics } = require('./topics.controller')
const { getArticles, getArticleById, getArticleComments, patchArticle } = require('./articles.controller')
const { postComment, deleteComment, patchComment } = require('./comments.controller')
const { getUsers, getUserById } = require('./users.controller')

module.exports = {
    getApi,
    getTopics,
    getArticles,
    getArticleById,
    getArticleComments,
    getUsers,
    getUserById,
    patchArticle,
    postComment,
    patchComment,
    deleteComment
}