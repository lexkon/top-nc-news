const { addComment, deleteCommentById } = require("../models")

const postComment = (req, res, next) => {
    const { article_id } = req.params
    const { username, body} = req.body
    
    addComment(article_id, username, body)
    .then((newComment) => res.status(201).send({ newComment }))
    .catch(next)
}

const deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    
    deleteCommentById(comment_id)
    .then(({body}) => {
        return res.status(204).send()
    })
    .catch(next)

}

module.exports = {
    postComment,
    deleteComment
}