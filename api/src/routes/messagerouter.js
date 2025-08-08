const { Router } = require('express')
const {
  getAllMessages,
  getMessageById,
  createMessage,
} = require('../models/messagedb')
const { isAuth, isAdmin } = require('../controllers/authcontroller')

const messageRouter = Router()

messageRouter.get('/', isAuth, isAdmin, async (req, res) => {
  try {
    const messages = await getAllMessages()
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

messageRouter.get('/:id', isAuth, async (req, res) => {
  try {
    const message = await getMessageById(req.params.id)
    res.json(message)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

messageRouter.post('/', isAuth, async (req, res) => {
  try {
    const message = await createMessage(
      req.body.chatId,
      req.user.id,
      req.body.message,
    )
    res.json(message)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

module.exports = { messageRouter }
