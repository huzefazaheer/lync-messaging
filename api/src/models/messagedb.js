const { prisma } = require('./prisma')

async function getAllMessages() {
  const messages = await prisma.message.findMany({})
  return messages
}

async function getMessageById(id) {
  const messages = await prisma.message.findUnique({ where: { id: id } })
  return messages
}

async function getChatMessages(chatId) {
  const messages = await prisma.message.findMany({ where: { chatId: chatId } })
  return messages
}

async function createMessage(chatId, userId, message) {
  const message = await prisma.message.create({
    data: { text: message, chatId: chatId, authorId: userId },
  })
  return message
}

module.exports = {
  getAllMessages,
  getMessageById,
  getChatMessages,
  createMessage,
}
