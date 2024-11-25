const endpointsJson = require("../endpoints.json")
const { fetchArticleById } = require("../models/articles.model")
const { fetchTopics } = require("../models/topics.model")

exports.getApi = (_, res) => {
    res.status(200).send({endpoints: endpointsJson})
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article })
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