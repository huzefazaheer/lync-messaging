const bcrypt = require('bcryptjs')
const { createUser } = require('../models/authdb')

async function signupController(req, res) {
  const username = req.body.username
  const password = req.body.password
  const display_name = req.body.display_name
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const user = await createUser(display_name, username, hashedPassword)
    res.status(200).json({ success: 'Success' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

async function isAuth(req, res, next) {
  if (req.isAuthenticated()) next()
  else res.status(401).json({ error: 'Unauthorised' })
}

async function isAdmin(req, res, next) {
  if (req.user.type == 'ADMIN') next()
  else res.status(401).json({ error: 'Unauthorised' })
}

async function isLoggedIn(req, res) {
  if (req.user) {
    const sendUser = {
      id: req.user.id,
      display_name: req.user.display_name,
      username: req.user.username,
      about: req.user.about,
      photo: req.user.profile_photo,
    }
    res.status(200).json({ success: 'Logged in', user: sendUser })
  } else res.status(401).json({ error: 'Not authorized' })
}

module.exports = { signupController, isAuth, isAdmin, isLoggedIn }
