const userModel = require ("../models/user.model");
const jwt = require('jsonwebtoken');

function generateToken(user){
    return jwt.sign({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.TOKEN_SECRET, {expiresIn:'30m'});
}

function generateRefreshToken(userId){
    return jwt.sign({
        userId
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'7d'})
}

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        return res.send({accessToken:''})
    }
    //check if the refresh token is valid
    let payload = null
    try{
        payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (error){
        return res.send({accessToken:''})
    }
    //check if there is a user with such an id
    const user = await userModel.findById(payload.userId)
    if(!user){
        return res.send({accessToken:''})
    }
    //check if the user has the same token
    if(user.refreshToken !== refreshToken){
        return res.send({accessToken:''})
    }
    //create new refresh and access token
    const userId = user._id.toString()
    const accessToken = generateToken(user)
    const newRefreshToken = generateRefreshToken(userId)
    await userModel.findByIdAndUpdate(userId, {refreshToken: newRefreshToken})

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        path: '/user/refresh_token'
    })
    return res.send({accessToken})
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) {
        return res.status(501).send("NULL TOKEN");
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {
        if(err){
            return res.status(501).send("Invalid TOKEN");
        }
        req.username = username

        next();
    })
}

const register = async (req, res) => {
    try{
        const user = await userModel.findOne({username: req.body.username})
    
        if(user){
            res.status(500).json({message: 'Username already taken!'})
            throw Error('Username already taken!')
        }
        
        const userProperties = req.body

        const cretedUser = await userModel.create(userProperties)
        
        res.status(200).send(cretedUser)
    }catch(Error){
        res.status(500).json({message: Error.message})
    }
}

const login = async(req, res) => {
    try{
        const user = await userModel.findOne({username: req.body.username, password: req.body.password})

        if(!user){
            res.status(500).send({message: 'User not existing'})
        }else{
            const userID = user._id.toString()

            const accessToken = generateToken(user)
            const refreshToken = generateRefreshToken(userID)
            
            await userModel.findByIdAndUpdate(userID, {refreshToken: refreshToken})

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            res.status(200).send(accessToken)
        }
    }catch (error){
        res.status(500).send({message:error.message})
    }
}

const logOut = async (req, res) => {
    const authHeader = req.headers['authorization']
    
    const accessToken = authHeader && authHeader.split(' ')[1]
    let payload = null
    try{
        payload = jwt.verify(accessToken, process.env.TOKEN_SECRET)
    }catch(error){
        return res.status(500).send({message: error.message})
    }
    
    const updatedUser = await userModel.findOneAndUpdate({username: payload.username}, {refreshToken: ''})
    console.log(updatedUser)

    res.clearCookie('refreshToken', {path:'/user/refresh_token'})
    res.status(200).send({message: 'Logged Out'})
}

module.exports = {
    register,
    login,
    verifyToken,
    logOut,
    refreshToken
}
