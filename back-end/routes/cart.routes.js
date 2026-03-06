const express = require('express')
const {addToCart, getCart, removeFromCart, updateCartItem} = require('../controllers/cart.controller')

const router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

router.use(bodyParser.urlencoded({extended: true}))
router.use(jsonParser)

router.post('/addInCart', addToCart)
router.get('/', getCart)
router.delete('/removeFromCart/:itemID', removeFromCart)
router.put('/update', updateCartItem)

module.exports = router;