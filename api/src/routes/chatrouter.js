const { Router } = require('express')
const { isAuth, isAdmin } = require('../controllers/authcontroller')
const { getAllChats, getChatById, createChat } = require('../models/chatsdb')

const chatRouter = Router()

chatRouter.get('/', isAuth, isAdmin, async (req, res) => {
  try {
    const chats = await getAllChats()
    res.json(chats)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

chatRouter.get('/:id', isAuth, async (req, res) => {
  try {
    const chat = await getChatById(req.params.id)
    res.json(chat)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

chatRouter.post('/', isAuth, async (req, res) => {
  try {
    const userIds = JSON.parse(req.body.users)
    const chat = await createChat(req.user.id, userIds)
    console.log(chat)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Database Error' })
  }
})

module.exports = { chatRouter }
