import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
    
        const hashPassword = await bcrypt.hash(password, 5)
    
        const newUser = await prisma.user.create({
            data : {
                username,
                email,
                password:hashPassword
            }
        })
    
        if(!newUser) {
            console.log(newUser)
            return res.status(401).json("Error while creating user")
        }
        
        console.log(newUser)
    
        res
        .status(200)
        .json({
            username,
            email, 
            hashPassword
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Failed to create a user")
    }
}

export const login = async (req, res) => {
    try {
        const {username, password}  = req.body
    
        const finduser = await prisma.user.findUnique({
            where : {username}
        })
    
        if(!finduser) {
            console.log(finduser)
            res.status(401).json("Invalid Login credentials")
            return
        }
    
        console.log(finduser)
    
        const isPasswordCorrect = await bcrypt.compare(password, finduser.password)
    
        if(!isPasswordCorrect) {
            res.status(401).json("Invalid Login credentials")
            return
        }

        const age = 1000*60*60*24*7

        const token = jwt.sign(
            {
                id:finduser.id,
                username:finduser.username

            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '7d'
            }
        )

        const {password:userpassword, ...user} = finduser
    
        res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        })
        .json(user)

    } catch (error) {
        console.error(error)
        res.status(500).json("Error while logging in")
    }
}

export const logout = async (req, res) => {
    // const username = req.user.username
    res.clearCookie("token").status(200).json(`you have been logged out successfully`)
}

