const db = require('../db/connection')
const { checkExists } = require('./utils.model')

const fetchArticles = async () => {
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
    
    const { rows } = await db.query(sqlQuery)
    return rows
}

const fetchArticleById = async (article_id) => {
    await checkExists('articles', 'article_id', article_id, "article does not exist")
    
    const { rows } = await db.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    return rows[0]
}

const fetchArticleComments = async (article_id) => {
    await checkExists('articles', 'article_id', article_id, "article does not exist")
    const { rows } = await db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
    return rows
}

module.exports = {
    fetchArticles, 
    fetchArticleById, 
    fetchArticleComments
}