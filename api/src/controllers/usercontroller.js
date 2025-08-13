const {
  getUserById,
  getAllUsers,
  addUserFriend,
  getUserChats,
  getUserByUsername,
  getUserBySearch,
  updateUser,
} = require('../models/userdb')

async function getUserController(req, res) {
  try {
    const user = await getUserById(req.params.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

async function getUserByUsernameController(req, res) {
  try {
    const user = await getUserBySearch(req.params.username)
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

async function updateUserController(req, res) {
  if (
    req.body &&
    req.body.display_name &&
    req.body.profile_picture &&
    req.body.about
  ) {
    const user = await updateUser(
      req.body.display_name,
      req.body.profile_picture,
      req.body.about,
    )
  } else res.status(403).json({ error: 'Invalid data' })
}

module.exports = {
  getAllUsersController,
  getUserController,
  addFriendController,
  getUserChatsController,
  getUserByUsernameController,
  updateUserController,
}
