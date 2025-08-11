const { Router } = require('express')

const passport = require('passport')
const { signupController } = require('../controllers/authcontroller')

const authRouter = Router()

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' })
    }

    if (!user) {
      return res.status(401).json({ message: info.message })
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Could not log in user' })
      }
      const sendUser = {
        display_name: req.user.display_name,
        username: req.user.username,
        about: req.user.about,
        photo: req.user.profile_photo,
      }
      return res
        .status(200)
        .json({ message: 'Login successful', user: sendUser })
    })
  })(req, res, next)
})
authRouter.post('/signup', signupController)

module.exports = { authRouter }
