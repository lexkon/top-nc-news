const db = require('../db/connection')
const { fetchArticleById } = require('./articles.model')

const addComment = (article_id, username, body) => {

    return fetchArticleById(article_id)
    .then(() => {

        if (!username || !body) {
            return Promise.reject({ status: 400, msg: 'bad request' })
        }

        const insertQry = `
    INSERT INTO comments (body, article_id, author)
    VALUES ($1, $2, $3) RETURNING *;`
        
    return db.query(insertQry, [body, article_id, username])
        .then(({rows}) => {
            return rows[0]
        })
    })
}

module.exports = {
    addComment
}