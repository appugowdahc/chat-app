import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {type: String,trim: true},
    chat: {
        type: momgoose.Schema.Types.ObjectId,
        ref: "Chat"
    }

},{timestamps: true});

const Message = mongoose.Model("Message",MessageModel);

module.exports = Message;