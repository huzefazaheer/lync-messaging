const { prisma } = require('./prisma')

async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      username: true,
      display_name: true,
      profile_photo: true,
      about: true,
    },
  })
  return user
}

async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({ where: { username: username } })
  return user
}

async function getUserBySearch(name) {
  const user =
    await prisma.$queryRaw`SELECT id, username, display_name FROM "User" WHERE username LIKE ${`%${name}%`};`

  return user
}

async function getUserFriends(id) {
  const userFriends = await prisma.user.findUnique({
    where: { id: id },
    select: {
      friends: { select: { id: true, username: true, display_name: true } },
    },
  })
  return userFriends
}

async function getUserChats(id) {
  const userFriends = await prisma.user.findUnique({
    where: { id: id },
    select: {
      chats: {
        select: {
          id: true,
          chat_type: true,
          chat_users: { select: { username: true, display_name: true } },
        },
      },
    },
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

async function updateUser(userId, display_name, profile_photo, desc) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      display_name: display_name,
      profile_photo: profile_photo,
      about: desc,
    },
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
  getUserBySearch,
  updateUser,
}
