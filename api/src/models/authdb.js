const { prisma } = require('./prisma')

async function createUser(display_name, username, password, photo, about) {
  const user = await prisma.user.create({
    data: {
      display_name: display_name,
      username: username,
      password: password,
      profile_photo: photo,
      about: about,
    },
  })
}

async function getOldPassword(id) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  })
  return user
}

async function updateUserPassword(id, newpass) {
  const user = await prisma.user.update({
    where: { id: id },
    data: { password: newpass },
  })
  return user
}

module.exports = { createUser, getOldPassword, updateUserPassword }
