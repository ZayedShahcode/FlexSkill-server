const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config();
const createToken = require('../utils/helpers')


const getUser = async(req,res)=>{
    try{
        const userId =  req.body;
        const user = await User.findByPk(userId);
        if(!user) req.status(404).send("User not found");
        req.status(200).json({user});
    }
    catch(e){
        req.status(500).json({"Error" : e});
    }
}

const getUsers = async(req,res)=>{
    try{
        const users = await User.findAll();
        res.status(200).json({
            message:"Success",
            users
        })
    }
    catch(error){
        res.json(500).json({error:"Error getting user details"})
    }
}

const addUser = async (req,res,next)=>{
    const {username, email, password, githubProfile} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            githubProfile: githubProfile || null
        });
        const token = createToken(user.id);
        res.cookie("token",token,{
            withCredentials: true,
            httpOnly: true,
        })
        res.status(201).json({
            message: "User signed in successfully", success: true, token
        })
        next()
        
    }
    catch(error){
        res.status(500).json({error: 'Error registering user'})
    }
}

const loginUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({where:{email}});
        if(!user) return res.status(404).json({error:"User not found"});
        const hashedPassword = user.password;
        const isValidPassword = await bcrypt.compare(password,hashedPassword);
        if(!isValidPassword) return res.status(401).json({error:"Invalid Credentials"})
        const token = createToken(user.id);
        res.cookie("token",token,{
            withCredentials:true,
            httpOnly:true
        })
        return res.status(200).json({
            message: "User logged in successfully", 
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                teamId: user.teamId,
                githubProfile: user.githubProfile
            }
        })
        next();
    }
    catch(err){
        return res.status(500).json({error:"Error logging in"});
    }
}

const deleteAll = async (req,res)=>{
    try{
        const dontdothis = await User.destroy({where:{}})
        res.send("All users deleted")
    }
    catch(err){
        console.log(err);
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            withCredentials: true,
            httpOnly: true
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error logging out" });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {getUser,getUsers,addUser,loginUser,deleteAll,logoutUser,getUserById}

