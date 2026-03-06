const {verifyJwtToken: verifyJwtRefreshToken} = require('../utils/jwt.util')
const express = require('express')
const tokenRouter = express.Router()

tokenRouter.post("/token", (req, res) => {
    const refreshToken = req.body.auth
    verifyJwtRefreshToken(refreshToken, res)
})

module.exports = {tokenRouter}