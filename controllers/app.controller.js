const endpointsJson = require("../endpoints.json")
const { fetchArticleById, fetchArticles, fetchArticleComments } = require("../models/articles.model")
const { fetchTopics } = require("../models/topics.model")

exports.getApi = (_, res) => {
    res.status(200).send({endpoints: endpointsJson})
}

exports.getArticles = (_, res) => {
    fetchArticles()
    .then((articles) => res.status(200).send({ articles }))
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch(next)
}

exports.getArticleComments = (req, res, next) => {
    const { article_id } = req.params
    
    fetchArticleComments(article_id)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

exports.getTopics = (_, res, next) => {
    return fetchTopics()
    .then((topics) => {
        return res.status(200).send({ topics })
    })
    .catch(next)
}