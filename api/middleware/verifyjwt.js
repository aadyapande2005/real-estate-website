import jwt from 'jsonwebtoken'

export const verifyjwt = async (req, res, next) => {
    try {
        const token = req.cookies.token
    
        if(!token) {
            return res.status(401).json("token not found")
        }
    
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if(err) return res.status(401).json("Invalid Token")
            const {id, username} = payload
            req.user = {id, username}
    
            next()
        })  
    } catch (error) {
        console.log(error)
        res.status(500).json("Error while verifying token")
    }

}