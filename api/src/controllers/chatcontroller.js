const { getAllChats, getChatById, createChat } = require('../models/chatsdb')

async function getAllChatsController(req, res) {
  try {
    const chats = await getAllChats()
    res.json(chats)
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
    const userIds = JSON.parse(req.body.users)
    const chat = await createChat(req.user.id, userIds)
    res.json(chat)
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
