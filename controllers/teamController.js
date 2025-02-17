const Teams = require('../model/TeamModel');
const User = require('../model/UserModel');

const getAllTeams = async (req,res)=>{
    try{
        const teams = await Teams.findAll();
        res.status(200).json({teams})
    }
    catch(err){
        res.status(501).send(err);
    }
}


const createTeam = async (req,res)=>{
    try{
        const {teamname,teamsize} = req.body;
        const newteam = await Teams.create({teamname,teamsize})
        res.status(200).json({newteam})
    }
    catch(err){
        res.status(501).send(err);
    }
}

const joinTeam = async (req,res)=>{
    try{
        const {userId,teamId} = req.body;
        const [updatedRows] = await User.update({teamId},{where : {id:userId}})
        if(updatedRows===0) return res.status(404).json({error: "User not found"})
        res.status(200).json({message:"User updated successfully"});
    }
    catch(err){
        res.status(500).json({error: "Internal Server error while joining team"});
    }
}

const leaveTeam = async(req,res)=>{
    try{
        const {userId} = req.body;
        const teamId = null;
        const [updatedRows] = await User.update({teamId},{where : {id:userId}})
        if(updatedRows===0) return res.status(404).json({error: "User not found"})
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

module.exports = {getAllTeams,createTeam,joinTeam,leaveTeam,getTeamMembers}