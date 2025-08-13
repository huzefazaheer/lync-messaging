const { Router } = require('express')

const passport = require('passport')
const {
  signupController,
  isLoggedIn,
  updatePasswordController,
  isAuth,
} = require('../controllers/authcontroller')

const authRouter = Router()

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' })
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not log in user' })
      }
      const sendUser = {
        id: req.user.id,
        display_name: req.user.display_name,
        username: req.user.username,
        about: req.user.about,
        photo: req.user.profile_photo,
      }
      return res
        .status(200)
        .json({ success: 'Login successful', user: sendUser })
    })
  })(req, res, next)
})

authRouter.post('/signup', signupController)

authRouter.get('/isloggedin', isLoggedIn)

authRouter.put('/update', isAuth, updatePasswordController)

module.exports = { authRouter }
