const asyncHandler = require('express-async-handler');
const User = require('../Models/UserModel')
const {generateJwtToken} = require('../config/jwtAuthenticate')
const bcrypt = require('bcryptjs')

const registerUser = asyncHandler(async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        const pic = req.file.location || null
        console.log("pic is ",pic)
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the fields")
    };

    
    const userExists = await User.findOne({email}) || await User.findOne({username})
    if (userExists){
        return res.status(400).send("user already exists");

    };
    
    const hashPassword = await bcrypt.hash(password,10);
    
    const user = await User.create({
        username,email,password:hashPassword,picture:pic
    })
    if(user){
        res.status(201).json(
            {
                _id: user._id,
                username: user.username,
                email: user.email,
                picture: user.picture,
                jwt: generateJwtToken(user)
            }
        )
    }else{
        res.status(400)
        throw new Error("Failed to create the user")
    }
    }catch(error){
        console.log(error)
        return res.status(400).json({"message":"Something went wrong."})
    }
    

})
const authUser = asyncHandler(async(req,res)=>{
    try{
        console.log("it entered")
        const {username,password} = req.body
        const user = await User.findOne({username});
        console.log("user")
        if(user){
            console.log("password")
            res.status(200).json({
                id: user._id,
                username: user.username,
                token: generateJwtToken(user)
            })
        }
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})
module.exports = {registerUser,authUser};