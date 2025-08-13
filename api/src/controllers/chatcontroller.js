const {
  getAllChats,
  getChatById,
  createChat,
  getChatByUsers,
} = require('../models/chatsdb')
const { getUserChats } = require('../models/userdb')

async function getAllChatsController(req, res) {
  try {
    if (req.user.type != 'ADMIN') {
      const chats = await getUserChats(req.user.id)
      res.json(chats)
    } else {
      const chats = await getAllChats()
      res.json(chats)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

async function getChatController(req, res) {
  try {
    const chat = await getChatById(req.params.id)
    res.json(chat)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

async function createChatController(req, res) {
  try {
    if (req.user.id in req.body.users)
      res.json({ error: 'Can not make chat with yourself' })
    const userIds = req.body.users
    const userIds_ = [...userIds, req.user.id]
    const chatExists = await getChatByUsers(userIds_)
    if (chatExists == null) {
      const chat = await createChat(req.user.id, userIds)
      res.json(chat)
    } else res.json({ error: 'Chat already exists' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

module.exports = {
  getAllChatsController,
  getChatController,
  createChatController,
}
