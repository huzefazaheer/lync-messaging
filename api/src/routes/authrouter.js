const { Router } = require('express')

const passport = require('passport')
const { signupController } = require('../controllers/authcontroller')

const authRouter = Router()

authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/',
  }),
)

authRouter.post('/signup', signupController)

module.exports = { authRouter }
