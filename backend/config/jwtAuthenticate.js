const jwt = require('jsonwebtoken')

const generateJwtToken = (user)=>{
    try{
        const token = jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
        return token
    }catch(error){
        return error.message
    };
    
}

module.exports = {generateJwtToken}
