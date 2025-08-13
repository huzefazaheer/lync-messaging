const { prisma } = require('./prisma')

async function getAllChats() {
  const chats = await prisma.chat.findMany({
    include: { chat_users: { select: { username: true } } },
  })
  return chats
}

async function getChatById(id) {
  const chat = await prisma.chat.findUnique({
    where: { id: id },
    include: { messages: true },
  })
  return chat
}

async function getChatByUsers(ids) {
  const chat = await prisma.chat.findFirst({
    where: { chat_users: { every: { id: { in: ids } } } },
  })
  return chat
}

async function createChat(userId, users) {
  const ids = [userId, ...users]
  let chat
  if (ids.length > 2) {
    chat = await prisma.chat.create({
      data: {
        chat_users: {
          connect: ids.map((id) => ({ id })),
        },
        chat_type: 'GROUP',
      },
    })
  } else {
    chat = await prisma.chat.create({
      data: {
        chat_users: {
          connect: ids.map((id) => ({ id })),
        },
      },
    })
  }

  return chat
}

module.exports = { getAllChats, getChatById, createChat, getChatByUsers }
