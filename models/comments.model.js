const db = require('../db/connection')
const { checkExists } = require('./utils.model')

const addComment = async (article_id, username, body) => {
    await checkExists('articles', 'article_id', article_id, "article does not exist")

    if (!username || !body) {
        return Promise.reject({ status: 400, msg: 'bad request' })
    }
    const insertQry = `
    INSERT INTO comments (body, article_id, author)
    VALUES ($1, $2, $3) RETURNING *;`
    const { rows } = await db.query(insertQry, [body, article_id, username])
    return rows[0]
}

module.exports = {
    addComment
}