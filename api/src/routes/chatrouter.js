const { Router } = require('express')
const { isAuth, isAdmin } = require('../controllers/authcontroller')
const {
  getAllChatsController,
  getChatController,
  createChatController,
} = require('../controllers/chatcontroller')

const chatRouter = Router()

chatRouter.get('/', isAuth, getAllChatsController)

chatRouter.get('/:id', isAuth, getChatController)

chatRouter.post('/', isAuth, createChatController)

module.exports = { chatRouter }
