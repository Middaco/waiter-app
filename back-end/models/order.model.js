const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    tableId: String,
    waiterId: String,
    deliveredAt: String,
    orderTakenAt: String, 
    isActive: Boolean, 
    barItems: [{
        id: Number, 
        item: String, 
        isDelivered: Boolean
    }], 
    kitchenItems: [{
        id: Number, 
        item: String, 
        isDelivered: Boolean
    }]
})

const orderModel = mongoose.model("Order", orderSchema, "Order")

module.exports = orderModel