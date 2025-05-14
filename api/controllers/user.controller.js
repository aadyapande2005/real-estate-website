export const updateUser = async (req, res) => {
    res.json("message : This is update user route")
}

export const getUser = async (req, res) => {
    res.send(req.user)
}