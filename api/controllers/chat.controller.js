import prisma from "../lib/prisma.js"

export const getChats = async (req, res) => {
    const tokenid = req.user.id
    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenid]
                }
            }
        });
        res.status(200).json(chats)
    } catch (error) {
        console.log(error)
        res.status(500).json("Failed to get your chats")
    }
}

export const getChat = async (req, res) => {
    const chatId = req.params.id
    const tokenid = req.user.id
    try {
        const chat = await prisma.chat.findUnique({
            where : {
                id : chatId,
                userIDs : {
                    hasSome: [tokenid]
                }                
            },
            include : {
                messages: true,
                users: true,
            }
        })
        if(!chat) res.status(403).json("You are not allowed to access this chat")

        res.status(200).json(chat)
    } catch (error) {
        console.log(error)
        res.status(500).json("Failed to get chat")
    }
}

export const createChat = async (req,res) => {
    const recieverId = req.params.id
    const tokenid = req.user.id
    try {
        const chat = await prisma.chat.create({
            data: {
                userIDs: [tokenid, recieverId]
            }
        });

        await prisma.user.update({
            where : {
                id: tokenid
            },
            data: {
                chatIDs : {
                    push: chat.id
                }
            }
        })

        await prisma.user.update({
            where : {
                id: recieverId
            },
            data: {
                chatIDs : {
                    push: chat.id
                }
            }
        })

        res.status(200).json(chat)
    } catch (error) {
        console.log(error)
        res.status(500).json("Failed to create chat")
    }
}

export const markAsRead = async (req, res) => {
    try {


        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json("Failed to get Users")
    }
}

