const { Router } = require('express')
const {
  getAllUsersController,
  getUserController,
  addFriendController,
  getUserChatsController,
  getUserByUsernameController,
  updateUserController,
} = require('../controllers/usercontroller')
const { isAuth, isAdmin } = require('../controllers/authcontroller')

const userRouter = Router()

userRouter.get('/:username', isAuth, getUserByUsernameController)

userRouter.get('/', isAuth, isAdmin, getAllUsersController)

userRouter.get('/:id', isAuth, getUserController)

userRouter.get('/:id/chats', isAuth, getUserChatsController)

userRouter.put('/add_friend/:id', isAuth, addFriendController)

userRouter.put('/', isAuth, updateUserController)

module.exports = { userRouter }
