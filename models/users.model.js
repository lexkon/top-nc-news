const db = require('../db/connection')

const fetchUsers = async () => {
    return db.query(`SELECT * FROM users;`)
}

module.exports = {
    fetchUsers
}