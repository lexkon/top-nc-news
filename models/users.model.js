const db = require('../db/connection')
const { checkExists } = require('./utils.model')

const fetchUsers = async () => {
    return db.query(`SELECT * FROM users;`)
}

const fetchUserById = async (username) => {
    await checkExists('users', 'username', username, "user does not exist")

    const sqlQuery = `
    SELECT * FROM users
    WHERE username = $1`

    const { rows } = await db.query(sqlQuery, [username])
    return rows[0]
}

module.exports = {
    fetchUsers,
    fetchUserById
}