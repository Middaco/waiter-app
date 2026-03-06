const mongoose = require('mongoose')
const schema = mongoose.Schema

const CartItemSchema = new schema({
    cartID: {type: mongoose.Types.ObjectId, ref: 'Cart'},
    terrariumID: {type: mongoose.Types.ObjectId, ref: 'Terrarium'},
    name: {type: String},
    quantity: {type: Number},
    totalPrice: {type: Number},
})

module.exports = mongoose.model("CartItem", CartItemSchema)