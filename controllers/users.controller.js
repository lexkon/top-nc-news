const { fetchUsers } = require("../models")

const getUsers = async (_, res) => {
    const { rows } = await fetchUsers()
    return res.status(200).send({users: rows})
}

module.exports = {
    getUsers
}