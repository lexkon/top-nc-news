const { fetchTopics } = require("../models/topics.model")


const getTopics = (_, res, next) => {
    return fetchTopics()
    .then((topics) => {
        return res.status(200).send({ topics })
    })
    .catch(next)
}

module.exports = {
    getTopics
}