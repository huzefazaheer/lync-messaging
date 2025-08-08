const { prisma } = require('./prisma')

async function getUserById(id) {
  const user = await prisma.user.findUnique({ where: { id: id } })
  return user
}

async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({ where: { username: username } })
  return user
}

async function createUser(display_name, username, password) {
  const user = await prisma.user.create({
    data: {
      display_name: display_name,
      username: username,
      password: password,
    },
  })
}

module.exports = { getUserById, getUserByUsername, createUser }
