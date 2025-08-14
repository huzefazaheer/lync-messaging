const express = require('express')
const passport = require('passport')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const expressSession = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const { PrismaSessionStore } = require('@quixo3/prisma-session-store')
const { getUserByUsername, getUserById } = require('./models/userdb')
const { prisma } = require('./models/prisma')
const { authRouter } = require('./routes/authrouter')
const { userRouter } = require('./routes/userrouter')
const { chatRouter } = require('./routes/chatrouter')
const { messageRouter } = require('./routes/messagerouter')

const app = express()

// Super permissive CORS for testing
app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  }),
)

// Basic session (we'll override the cookie manually)
app.use(
  expressSession({
    secret: 'cats',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
)

// NUCLEAR OPTION: Manually rewrite ALL Set-Cookie headers
app.use((req, res, next) => {
  const originalSetHeader = res.setHeader
  const originalAppendHeader = res.appendHeader || function () {}

  res.setHeader = function (name, value) {
    if (name.toLowerCase() === 'set-cookie') {
      if (Array.isArray(value)) {
        value = value.map((cookie) => modifyCookie(cookie))
      } else {
        value = modifyCookie(value)
      }
    }
    return originalSetHeader.call(this, name, value)
  }

  // Also override append header
  res.appendHeader = function (name, value) {
    if (name.toLowerCase() === 'set-cookie') {
      value = modifyCookie(value)
    }
    return originalAppendHeader.call(this, name, value)
  }

  function modifyCookie(cookie) {
    if (typeof cookie === 'string' && cookie.includes('connect.sid')) {
      // Remove any existing attributes
      let cleanCookie = cookie.split(';')[0] // Keep only name=value

      // Add our attributes
      cleanCookie += '; Path=/'
      cleanCookie += '; HttpOnly'
      cleanCookie += '; Secure'
      cleanCookie += '; SameSite=None'
      cleanCookie += `; Max-Age=${7 * 24 * 60 * 60}` // 7 days

      return cleanCookie
    }
    return cookie
  }

  next()
})

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Your existing passport config
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username)
      if (!user) return done(null, false)
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) return done(null, false)
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
    if (user) return done(null, user)
    done(null, false)
  } catch (error) {
    done(error, null)
  }
})

app.use(authRouter)
app.use('/users', userRouter)
app.use('/chats', chatRouter)
app.use('/messages', messageRouter)
app.use('/ping', (req, res) =>
  res.redirect('https://lync-messaging.vercel.app/'),
)

app.listen(8080, () => {
  console.log('Server started')
})
