const { fetchTopics } = require("../models/topics.model")


exports.getTopics = (_, res, next) => {
    return fetchTopics()
    .then((topics) => {
        return res.status(200).send({ topics })
    })
    .catch(next)
}