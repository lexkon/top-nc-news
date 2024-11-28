const { fetchTopics } = require("../models/topics.model")


const getTopics = (_, res, next) => {
    return fetchTopics()
    .then(({rows}) => {
        return res.status(200).send({ topics: rows })
    })
    .catch(next)
}

module.exports = {
    getTopics
}