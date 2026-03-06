var express = require('express')
const {register, login, logOut, refreshToken} = require('../controllers/user.controller')

const router = express.Router();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var jsonParser = bodyParser.json()

router.use(bodyParser.urlencoded({extended: true}))
router.use(cookieParser())
router.use(jsonParser)

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logOut)
router.post('/refresh_token', refreshToken)

module.exports = router;