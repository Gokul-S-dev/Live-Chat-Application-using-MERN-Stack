// chat name
// is group chat
// users
// latest message
// group admin

import mongoose from "mongoose";
import { time } from "node:console";
import { type } from "node:os";
import { ref } from "node:process";

const chatSchema = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;