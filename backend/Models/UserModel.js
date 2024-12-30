const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema(
    {
        username: {type: String, required: true,unique: true},
        email: {type: String, required: true,unique:true},
        password: {type: String, required: true},
        picture: {
            type: String, 
            default: "https://thumbs.dreamstime.com/b/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration-eps-335385751.jpg",
        },
        
    },
    {
        timestamps: true
    }
);
UserSchema.pre('save',async function(next) {
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password,salt)

    
})
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User",UserSchema);

module.exports = User;