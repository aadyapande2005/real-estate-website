import jwt from 'jsonwebtoken'

export const verifyjwt = async (req, res, next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies.token
    
        if(!token) {
            return res.status(401).json("message : token not found")
        }
    
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if(err) return res.status(401).json("message : Invalid Token")
            console.log(payload)    
            req.user = payload
    
            next()
        })  
    } catch (error) {
        console.log(error)
        res.status(500).json("message : Error while verifying token")
    }

}