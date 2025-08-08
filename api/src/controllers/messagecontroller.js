const {
  getAllMessages,
  getMessageById,
  createMessage,
} = require('../models/messagedb')

async function createMessageController(req, res) {
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
}

async function getMessageController(req, res) {
  try {
    const message = await getMessageById(req.params.id)
    res.json(message)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

async function getMessagesController(req, res) {
  try {
    const messages = await getAllMessages()
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

module.exports = {
  getMessageController,
  getMessagesController,
  createMessageController,
}
