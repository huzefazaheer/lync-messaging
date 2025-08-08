const bcrypt = require('bcryptjs')
const { createUser } = require('../models/authdb')

async function signupController(req, res) {
  const username = req.body.username
  const password = req.body.password
  const display_name = req.body.display_name
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const user = await createUser(display_name, username, hashedPassword)
    res.status(200).json({ success: user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Database Error' })
  }
}

module.exports = { signupController }
