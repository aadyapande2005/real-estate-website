import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const updateUser = async (req, res) => {
    const id = req.params.id
    const tokenid = req.user.id
    try {
        if (id !== tokenid) {
            return res.status(403).json("You can only update your own profile")
        }
        const { username, email, password, avatar } = req.body
        let hashPassword = null
        if(password)
        {
            hashPassword = await bcrypt.hash(password, 5)
        }
        const updatedUser = await prisma.user.update({
            where: { id: tokenid },
            data: { username, email, ...(password && { password: hashPassword }), ...(avatar && { avatar }) }
        })
        updatedUser.password = undefined // Exclude password from response
        res
        .status(200)
        .json(updatedUser)
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json("Failed to update User")
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    const tokenid = req.user.id
    try {
        if (id !== tokenid) {
            return res.status(403).json("You can only delete your own profile")
        }
        await prisma.user.delete({
            where: { id: tokenid }
        })
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

export const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const users = await prisma.user.findUnique({
            where:{id},
            include: {
                posts: true
            }
        })
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

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            
        })
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

