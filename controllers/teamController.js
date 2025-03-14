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
        const {teamname,teamDescription,teamsize,details,userId,username,githubLink} = req.body;
        const newTeam = await Team.create({
            teamname,
            teamDescription,
            teamsize,
            githubLink,
            details,
            teamLeader: userId,
            leaderName: username
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

const getTeamMembers = async (req, res) => {
    try {
        const teamId = req.params.id;
        const team = await Team.findByPk(teamId);

        if (!team) {
            return res.status(404).json({ error: "Cannot find team" });
        }

        const users = team.members; 

        if (!users || users.length === 0) {
            return res.status(200).json({ members: [] });
        }

        const members = await Promise.all(
            users.map(async (userId) => {
                const user = await User.findByPk(userId);
                return user ? {
                    id: user.dataValues.id,
                    username: user.dataValues.username
                } : null;
            })
        );

        res.status(200).json({ members: members.filter((member) => member !== null) });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


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