const { fetchArticleById, fetchArticles, fetchArticleComments, modifyArticle } = require('../models')

const getArticles = async (req, res, next) => {
    const { sort_by } = req.query
    
    try {
        const articles = await fetchArticles(sort_by)
        return res.status(200).send({ articles })
    } catch (error) {
        next(error)
    }
}

const getArticleById = async (req, res, next) => {
    const { article_id } = req.params
    
    try {
        const article = await fetchArticleById(article_id)
        return res.status(200).send({ article })
    } catch (error) {
        next(error)
    }
}

const getArticleComments = async (req, res, next) => {
    const { article_id } = req.params
    try {
        const comments = await fetchArticleComments(article_id)
        return res.status(200).send({comments})
    } catch (error) {
        next(error)
    }
}

const patchArticle = async (req, res, next) => {
    const {article_id} = req.params
    const { inc_votes } = req.body

    try {
        const article = await modifyArticle(article_id, inc_votes)
        return res.status(200).send({article})
    } catch (error) {
        next(error)
    }
}

module.exports = { 
    getArticles,
    getArticleById,
    getArticleComments,
    patchArticle
}