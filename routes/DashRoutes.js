const express = require('express')
const {getDashBoard, getUserTeam} = require('../controllers/dashController')

const dashRouter = express.Router();

//  /dash

dashRouter.route('/:id')
.get(getUserTeam)

dashRouter.route('/')
.get(getDashBoard)


module.exports = dashRouter;