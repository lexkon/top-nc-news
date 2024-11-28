const { fetchArticleById, fetchArticles, fetchArticleComments, modifyArticle } = require('../models')

const getArticles = async (req, res, next) => {
    const { sort_by, order, ...unacceptedQueries } = req.query
    
    const validSorts = ['created_at', 
        'article_id', 
        'title', 
        'topic', 
        'author', 
        'votes',
        'comment_count'
    ]
    const validOrders = ['ASC', 'DESC']
    
    if(Object.keys(unacceptedQueries).length > 0) {
        return next({ status: 400, msg: 'invalid query'})
    }

    if(sort_by && !validSorts.includes(sort_by)) {
        return next({ status: 400, msg: 'invalid sort query'})
    }

    if (order && !validOrders.includes(order.toUpperCase())) {
        return next({ status: 400, msg: 'invalid sort order'})
    }

    try {
        const articles = await fetchArticles(sort_by, order)
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