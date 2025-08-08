const { Router } = require('express')
const {
  getAllUsersController,
  getUserController,
} = require('../controllers/usercontroller')
const { isAuth, isAdmin } = require('../controllers/authcontroller')
const { getUserById, addUserFriend } = require('../models/userdb')

const userRouter = Router()

userRouter.get('/', isAuth, isAdmin, getAllUsersController)

userRouter.get('/:id', isAuth, getUserController)

userRouter.put('/add_friend/:id', isAuth, async (req, res) => {
  try {
    const friend = getUserById(req.params.id)
    if (!friend) res.status(402).json({ error: 'User does not exist' })
    const u = await addUserFriend(req.user.id, req.params.id)
    console.log(u)
  } catch (error) {}
})

module.exports = { userRouter }
