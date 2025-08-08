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

async function addUserFriend(userId, friendId) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { friends: { connect: { id: friendId } } },
  })
}

module.exports = { getAllUsers, getUserById, getUserByUsername, addUserFriend }
