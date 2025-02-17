const express = require('express')
const {getAllTeams, createTeam, joinTeam, leaveTeam, getTeamMembers} = require('../controllers/teamController')

const teamRouter = express.Router();

teamRouter.route('/:id')
.get(getTeamMembers)

teamRouter.route('/')
.get(getAllTeams)
.post(createTeam)

teamRouter.route('/join')
.patch(joinTeam)
.delete(leaveTeam)



module.exports = teamRouter
