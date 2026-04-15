const jwt = require('jsonwebtoken')

const refreshTokens = []

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(400).send('Missing token')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send('Expired token')
        req.user = user
        next()
    })
}

function generateRefreshToken(user){
    const refreshToken = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    return refreshToken
}

function generateAccessToken(user){
    return jwt.sign(JSON.parse(JSON.stringify(user)), process.env.ACCESS_TOKEN_SECRET)
}

function verifyJwtToken(refreshToken, res){
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.send(401)
        const accessToken = generateAccessToken(user)
        return res.json({accessToken: accessToken})
    })
}

module.exports={
    authenticateToken, 
    generateRefreshToken, 
    generateAccessToken,
    verifyJwtToken
}