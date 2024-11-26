const { fetchArticleById, fetchArticles, fetchArticleComments } = require('../models')

const getArticles = (_, res) => {
    fetchArticles()
    .then((articles) => res.status(200).send({ articles }))
}

const getArticleById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch(next)
}

const getArticleComments = (req, res, next) => {
    const { article_id } = req.params
    
    fetchArticleComments(article_id)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

module.exports = { 
    getArticles,
    getArticleById,
    getArticleComments
}