const mongoose = require('mongoose')
const schema = mongoose.Schema

const CartSchema = new schema({
    userID: {type: mongoose.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model("Cart", CartSchema)