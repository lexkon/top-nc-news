const { fetchTopics } = require("../models/topics.model")

const getTopics = async (_, res, next) => {
    try {
        const { rows } = await fetchTopics()
        return res.status(200).send({ topics: rows })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getTopics
}