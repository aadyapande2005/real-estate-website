import prisma from "../lib/prisma.js";
import { io } from "../index.js";

export const sendMessage = async (req, res) => {
    const chatId = req.params.id
    const tokenid = req.user.id
    const text = req.body.text;
    try {
        const checkChat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenid]
                }
            }
        })
        if (!checkChat) {
            return res.status(403).json("You are not allowed to send message in this chat")
        }
        const message = await prisma.message.create({
            data : {
                text,
                chatId,
                userId: tokenid,
            }
        })
        await prisma.chat.update({
            where: {
                id: chatId,
            },
            data: {
                lastMessage: text,
            }
        })
        // Emit the new message to all clients in the chat room
        io.to(chatId).emit("newMessage", message);
        res
        .status(200)
        .json(message)
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json("Failed to send message")
    }
}
