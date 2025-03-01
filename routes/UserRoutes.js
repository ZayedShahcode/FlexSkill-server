const express = require('express')
const {getUser,getUsers,addUser, loginUser, deleteAll} = require('../controllers/userController')
const {userVerification} = require('../middlewares/AuthMiddleware')
const userRouter = express.Router();

// /user

userRouter.route('/')
.get(getUser)
.post(loginUser)


userRouter.route('/new')
.get(getUsers)
.post(addUser)

userRouter.route('/verify')
.post(userVerification)

userRouter.route('/deleteAll')
.get(deleteAll)


module.exports = userRouter;
