const db = require('../db/connection')

exports.fetchArticles = () => {
    const sqlQuery = `SELECT
            articles.article_id,
            articles.title,
            articles.topic,
            articles.author,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            COUNT(comments.comment_id)::INT AS comment_count
        FROM
            articles
            LEFT JOIN comments ON articles.article_id = comments.article_id
        GROUP BY
            articles.article_id
        ORDER BY
            articles.created_at DESC;`
    
    return db.query(sqlQuery)
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 500, msg: 'internal server error' })
            }

            return result.rows
        })
}

exports.fetchArticleById = (article_id) => {
    return db
        .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'article does not exist' })
            }

            return result.rows[0]
        })
}