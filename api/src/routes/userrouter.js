const { Router } = require('express')
const {
  getAllUsersController,
  getUserController,
  addFriendController,
  getUserChatsController,
  getUserByUsernameController,
  updateUserController,
  getUserFriendsController,
  deleteUserFriendsController,
} = require('../controllers/usercontroller')
const { isAuth, isAdmin } = require('../controllers/authcontroller')

const userRouter = Router()

userRouter.get('/friends', isAuth, getUserFriendsController)

userRouter.delete('/friends', isAuth, deleteUserFriendsController)

userRouter.get('/:username', isAuth, getUserByUsernameController)

userRouter.get('/', isAuth, isAdmin, getAllUsersController)

userRouter.get('/:id', isAuth, getUserController)

userRouter.get('/:id/chats', isAuth, getUserChatsController)

userRouter.put('/add_friend', isAuth, addFriendController)

userRouter.put('/', isAuth, updateUserController)

module.exports = { userRouter }
