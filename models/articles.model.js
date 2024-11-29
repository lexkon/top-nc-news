const db = require('../db/connection')
const { checkExists } = require('./utils.model')

const fetchArticles = async (sort_by = 'created_at', order = 'DESC', topic) => {

    const queryValues = []

    let sqlQuery = `SELECT
            articles.article_id,
            articles.title,
            articles.topic,
            articles.author,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
        COUNT(comments.comment_id)::INT AS comment_count
        FROM articles
        JOIN comments 
        ON articles.article_id = comments.article_id `
        
        if (topic) {
            await checkExists('topics', 'slug', topic, "topic does not exist")
            sqlQuery += ` WHERE articles.topic = $1 `
            queryValues.push(topic)
        }
        
        sqlQuery += `
        GROUP BY articles.article_id 
        ORDER BY articles.${sort_by} ${order};`
    
    const { rows } = await db.query(sqlQuery, queryValues)
    return rows
}

const fetchArticleById = async (article_id) => {
    await checkExists('articles', 'article_id', article_id, "article does not exist")

    const sqlQuery = `SELECT
            articles.*,
        COUNT(comments.comment_id)::INT AS comment_count
        FROM articles
        JOIN comments 
        ON articles.article_id = comments.article_id 
        WHERE articles.article_id = $1
        GROUP BY articles.article_id
    `

    const { rows } = await db.query(sqlQuery, [article_id])
    return rows[0]
}

const fetchArticleComments = async (article_id) => {
    await checkExists('articles', 'article_id', article_id, "article does not exist")
    const { rows } = await db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
    return rows
}

const modifyArticle = async (article_id, inc_votes) => {
    await checkExists("articles", "article_id", article_id, "article does not exist")
    
    const queryStr = `
        UPDATE
            articles
        SET 
            votes = votes + $1
        WHERE
            article_id = $2
        RETURNING *`

    const { rows } = await db.query(queryStr, [inc_votes, article_id])
    
    return rows[0]

}

module.exports = {
    fetchArticles, 
    fetchArticleById, 
    fetchArticleComments,
    modifyArticle
}