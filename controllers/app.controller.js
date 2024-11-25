const endpointsJson = require("../endpoints.json")
const { fetchTopics } = require("../models/topics.model")

exports.getApi = (_, res) => {
    res.status(200).send({endpoints: endpointsJson})
}

exports.getTopics = (_, res, next) => {
    return fetchTopics()
    .then((topics) => {
        res.status(200).send({ topics })
    })
    .catch(next)
}