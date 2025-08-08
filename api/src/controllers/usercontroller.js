const {
  getUserById,
  getAllUsers,
  addUserFriend,
  getUserChats,
} = require('../models/userdb')

async function getUserController(req, res) {
  try {
    const user = await getUserById(req.params.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

async function addFriendController(req, res) {
  try {
    const friend = getUserById(req.params.id)
    if (!friend) res.status(402).json({ error: 'User does not exist' })
    const u = await addUserFriend(req.user.id, req.params.id)
    console.log(u)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

async function getUserChatsController(req, res) {
  try {
    const chats = await getUserChats(req.user.id)
    res.json(chats)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

module.exports = {
  getAllUsersController,
  getUserController,
  addFriendController,
  getUserChatsController,
}
