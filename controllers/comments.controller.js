const { addComment } = require("../models")

const postComment = (req, res, next) => {
    const { article_id } = req.params
    const { username, body} = req.body
    
    addComment(article_id, username, body)
    .then(({body}) => {
        return res.status(201).send({posted_comment: body})
    })
    .catch(next)
}

module.exports = {
    postComment
}