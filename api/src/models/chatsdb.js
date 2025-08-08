const { prisma } = require('./prisma')

async function getAllChats() {
  const chats = await prisma.chat.findMany({})
  return chats
}

async function getChatById(id) {
  const chat = await prisma.chat.findUnique({ where: { id: id } })
  return chat
}

async function createChat(userId, users) {
  const ids = [userId, ...users]

  if (ids.length > 2) {
    const chat = await prisma.chat.create({
      data: {
        chat_users: {
          connect: ids.map((id) => ({ id })),
        },
        chat_type: 'GROUP',
      },
    })
  } else {
    const chat = await prisma.chat.create({
      data: {
        chat_users: {
          connect: ids.map((id) => ({ id })),
        },
      },
    })
  }

  return chat
}

module.exports = { getAllChats, getChatById, createChat }
