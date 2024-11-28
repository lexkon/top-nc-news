const { fetchUsers } = require("../models")

const getUsers = (_, res, next) => {
    fetchUsers().then(({rows}) => res.status(200).send({users: rows}))
    .catch(next)
}

module.exports = {
    getUsers
}