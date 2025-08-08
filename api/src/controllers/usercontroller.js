const { getUserById, getAllUsers } = require('../models/userdb')

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

module.exports = { getAllUsersController, getUserController }
