const { prisma } = require('./prisma')

async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({ where: { id: id } })
  return user
}

async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({ where: { username: username } })
  return user
}

async function getUserFriends(id) {
  const userFriends = await prisma.user.findUnique({
    where: { id: id },
    select: { friends: { select: { id: true, username: true } } },
  })
  return userFriends
}

async function getUserChats(id) {
  const userFriends = await prisma.user.findUnique({
    where: { id: id },
    select: { chats: { select: { id: true, chat_type: true } } },
  })
  return userFriends
}

async function addUserFriend(userId, friendId) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { friends: { connect: { id: friendId } } },
    include: { friends: { select: { id: true, username: true } } },
  })
  return user
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserFriends,
  addUserFriend,
  getUserChats,
}
