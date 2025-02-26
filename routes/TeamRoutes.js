const express = require('express')
const {getAllTeams, createTeam, joinTeam, leaveTeam, getTeamMembers, deleteTeam} = require('../controllers/teamController')

// /team 

const teamRouter = express.Router();
teamRouter.route('/:id') 
.get(getTeamMembers)

teamRouter.route('/')
.get(getAllTeams)
.post(createTeam)
.delete(deleteTeam)

teamRouter.route('/join')
.patch(joinTeam)
.delete(leaveTeam)



module.exports = teamRouter
