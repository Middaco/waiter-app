const userModel = require('../models/user.model')
const {generateAccessToken, generateRefreshToken} = require('../utils/jwt.util')
const express = require('express')
const logInRouter = express.Router()

logInRouter.post("/login", async (req, res) => {
    const receivedUserCode = +req.body.userCode
    if(isNaN(receivedUserCode)){
        res.status(500).send('The passed code is not a number')
    }else{
        const user = await userModel.findOne({id: receivedUserCode})
        if(user){
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        }else{
            res.status(404).send('User doesn\'t exist')
        }
    }
})

module.exports = {logInRouter}