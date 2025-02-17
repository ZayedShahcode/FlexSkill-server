const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const userVerification = (req,res)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
   
    if(!token) return res.json({status:false,message:"Token not found"})
    jwt.verify(token,process.env.SECRET, async(err,data)=>{
        if(err){
            return res.status(500).json({status: false,err:err})
        }
        else{
            const user= await User.findOne({where:{id:data.id},attributes: {exclude:['password']}})
            if(user) return res.status(200).json({status:true,user:user})
            else return res.status(404).json({status:false,message:"User not found"})
        }
    })
}
 
module.exports = {userVerification};