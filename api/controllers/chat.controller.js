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
        res
        .status(200)
        .json(chats)
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json("Failed to update User")
    }
}

export const getChat = async (req, res) => {
    const id = req.params.id
    const tokenid = req.user.id
    try {
        
        res
        .status(200)
        .json("User deleted successfully")
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json("Failed to delete User")
    }
}

export const sendMessage = async (req, res) => {
    const id = req.params.id
    try {
        
        res
        .status(200)
        .json(users)
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json("Failed to get User")
    }
}

export const markAsRead = async (req, res) => {
    try {


        res
        .status(200)
        .json(users)
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json("Failed to get Users")
    }
}

