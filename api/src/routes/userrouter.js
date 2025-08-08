const { Router } = require('express')
const {
  getAllUsersController,
  getUserController,
  addFriendController,
  getUserChatsController,
} = require('../controllers/usercontroller')
const { isAuth, isAdmin } = require('../controllers/authcontroller')

const userRouter = Router()

userRouter.get('/', isAuth, isAdmin, getAllUsersController)

userRouter.get('/:id', isAuth, getUserController)

userRouter.get('/:id/chats', isAuth, getUserChatsController)

userRouter.put('/add_friend/:id', isAuth, addFriendController)

module.exports = { userRouter }
