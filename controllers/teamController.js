const User = require('../model/UserModel');
const Team = require('../model/TeamModel');

const getAllTeams = async (req,res)=>{
    try{
        const teams = await Team.findAll();
        res.status(200).json({teams})
    }
    catch(err){
        res.status(501).send(err);
    }
}


const createTeam = async (req,res)=>{
    try{
        const {teamname,teamDescription,teamsize,userId} = req.body;
        const newTeam = await Team.create({
            teamname,
            teamDescription,
            teamsize,
            teamLeader: userId
        });

        await User.update({ teamId: newTeam.id }, { where: { id: userId } });
        res.status(200).json({message:"success",newTeam})
    }
    catch(err){
        res.status(501).send(err);
    }
}

const joinTeam = async (req,res)=>{
    try{
        const {userId,teamId} = req.body;
       const team = await Team.findByPk(teamId)
       if(!team){
           return res.status(404).json({ message: "Team not found" });
        }
        
        const user = await User.findByPk(userId);
        
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        
        await team.addMember(userId);
        user.teamId = team.id;
        await user.save();
        
        res.status(200).json({message:"User updated successfully"});
    }
    catch(err){
        res.status(500).json({error: "Internal Server error while joining team"});
    }
}

const leaveTeam = async(req,res)=>{
    try{
        const {userId,teamId} = req.body;

        const team = await Team.findByPk(teamId);
        if(!team) return res.status(404).json({message:"Team not found"})
       
        const user =  await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (team.teamLeader === userId) {
            return res.status(400).json({ message: "Cannot remove the team leader" });
        }
        await team.removeMember(userId);
        // may be change users teamId
        user.teamId = null;
        await user.save();
        res.status(200).json({message:"User updated successfully"});
    }
    catch(err){
        res.status(500).json({error: "Internal Server error while leaving team"});
    }
}

const getTeamMembers = async(req,res) =>{
    try{
        const teamId = req.params.id;
        const users = await User.findAll({where:{teamId}})
        if(!users) return res.status(404).json({error:"No users found"})
        res.status(200).json({users})
    }
    catch{
        res.status(500).json({error:"Internal server error"})
    }

}

const deleteTeam = async(req,res)=>{
    try{
        const {teamId} = req.body;
        await Team.destroy({where:{id:teamId}})
        res.status(200).json({message:"Success"})
    }
    catch(e){
        res.status(500).send(e)
    }
}

module.exports = {getAllTeams,createTeam,joinTeam,leaveTeam,getTeamMembers,deleteTeam}