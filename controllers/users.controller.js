const { fetchUsers } = require("../models")

const getUsers = (_, res, next) => {
    fetchUsers().then((users) => res.status(200).send({users}))
    .catch(next)
}

module.exports = {
    getUsers
}