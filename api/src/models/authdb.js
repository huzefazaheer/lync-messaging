const { prisma } = require('./prisma')

async function createUser(display_name, username, password) {
  const user = await prisma.user.create({
    data: {
      display_name: display_name,
      username: username,
      password: password,
    },
  })
}

module.exports = { createUser }
