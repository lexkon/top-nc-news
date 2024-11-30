const { fetchUsers, fetchUserById } = require("../models")

const getUsers = async (_, res) => {
    const { rows } = await fetchUsers()
    return res.status(200).send({ users: rows })
}

const getUserById = async (req, res, next) => {
    const { username } = req.params

    try {
        const user = await fetchUserById(username)
        return res.status(200).send({ user })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    getUserById
}