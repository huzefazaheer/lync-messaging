const { Router } = require('express')

const passport = require('passport')
const { signupController } = require('../controllers/authcontroller')

const authRouter = Router()

app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/',
  }),
)

app.post('/signup', signupController)

module.exports = { authRouter }
