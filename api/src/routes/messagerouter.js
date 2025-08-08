const { Router } = require('express')
const { isAuth, isAdmin } = require('../controllers/authcontroller')
const {
  getMessagesController,
  createMessageController,
} = require('../controllers/messagecontroller')

const messageRouter = Router()

messageRouter.get('/', isAuth, isAdmin, getMessagesController)

messageRouter.get('/:id', isAuth, getMessagesController)

messageRouter.post('/', isAuth, createMessageController)

module.exports = { messageRouter }
