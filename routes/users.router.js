const express = require('express')
const { getUsers, getUserById } = require('../controllers')

const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:username', getUserById)

module.exports = usersRouter
