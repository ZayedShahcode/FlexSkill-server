const express = require('express')
const {getUser,addUser, loginUser, deleteAll} = require('../controllers/userController')
const {userVerification} = require('../middlewares/AuthMiddleware')
const userRouter = express.Router();

// /user

userRouter.route('/')
.post(loginUser)


userRouter.route('/new')
.get(getUser)
.post(addUser)

userRouter.route('/verify')
.post(userVerification)

userRouter.route('/deleteAll')
.get(deleteAll)


module.exports = userRouter;
