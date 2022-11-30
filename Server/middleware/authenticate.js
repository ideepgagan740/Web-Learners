const jwt=require("jsonwebtoken");
const User = require("../models/userSchema");

const Authenticate=async(req,res,next)=>{
    try {
        console.log(req.cookies.jwtoken)
        const token=req.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY)
        const rootUser= await User.findOne({_id:verifyToken._id, "tokens.token":token});
        if(!rootUser){
            throw new Error("User Not Found")
        }
        else{
            req.token=token;
            req.rootUser=rootUser;
            req.userID=rootUser._id
            next();
        }
    } catch (error) {
        res.status(401).send("unauthorized: No token provided")
        console.log(error)   
    }
}
module.exports = Authenticate;