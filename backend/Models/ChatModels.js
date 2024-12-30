const mongoose = require('mongoose')
const ChatModel = mongoose.Schema(
    {
        chatName: {type: String, trim: true},
        isGroupChat: {type: Boolean, default: false},
        users: [
            {
            type: mongoose.Schema.Type.ObjectId,
            ref: "User"
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Type.ObjectId,
            ref: "Meassage"
        },
        groupAdmin: {
            type: mongoose.Schema.Type.ObjectId,
            ref: "User"
        },
    }
)

const Chat = mongoose.model("Chat",ChatModel)

module.exports = Chat