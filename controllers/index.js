const { getApi} = require('./app.controller')
const { getTopics } = require('./topics.controller')
const { getArticles, getArticleById, getArticleComments, patchArticle } = require('./articles.controller')
const { postComment, deleteComment } = require('./comments.controller')
const { getUsers } = require('./users.controller')

module.exports = {
    getApi,
    getTopics,
    getArticles,
    getArticleById,
    getArticleComments,
    getUsers,
    patchArticle,
    postComment,
    deleteComment
}