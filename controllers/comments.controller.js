const { addComment, deleteCommentById, modifyComment } = require("../models")

const postComment = async (req, res, next) => {
    const { article_id } = req.params
    const { username, body, ...unacceptedData } = req.body

    if (Object.keys(unacceptedData).length > 0) {
        return next({ status: 400, msg: 'invalid request' })
    }

    try {
        const newComment = await addComment(article_id, username, body)
        return res.status(201).send({ newComment })
    } catch (error) {
        next(error)
    }
}

const patchComment = async (req, res, next) => {
    const { comment_id } = req.params
    const { inc_votes, ...unacceptedData } = req.body

    if (Object.keys(unacceptedData).length > 0) {
        return next({ status: 400, msg: 'invalid request' })
    }

    try {
        const comment = await modifyComment(comment_id, inc_votes)
        return res.status(200).send({ comment })
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
    patchComment,
    deleteComment
}