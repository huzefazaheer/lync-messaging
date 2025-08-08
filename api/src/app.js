const express = require('express')
const passport = require('passport')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const expressSession = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const { PrismaSessionStore } = require('@quixo3/prisma-session-store')

const {
  getUserByUsername,
  getUserById,
  createUser,
} = require('./models/authdb')
const { prisma } = require('./models/prisma')
const { authRouter } = require('./routes/authrouter')

const app = express()
app.use(cors())

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username)
      if (!user) done(null, null)
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) done(null, null)
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  }),
)

passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (error) {
    done(error, null)
  }
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id)
    if (user) done(null, user)
    done(null, null)
  } catch (error) {
    done(error, null)
  }
})

app.use(authRouter)

app.get('/', (req, res) => {
  console.log(req.user)
})

app.listen(8080, () => {
  console.log('Server started')
})
