const { addComment, deleteCommentById } = require("../models")

const postComment = async (req, res, next) => {
    const { article_id } = req.params
    const { username, body } = req.body

    try {
        const newComment = await addComment(article_id, username, body)
        return res.status(201).send({ newComment })
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    const { comment_id } = req.params
    try {
        await deleteCommentById(comment_id)
        return res.status(204).send()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postComment,
    deleteComment
}