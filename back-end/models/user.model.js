const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    role: String, //waiter, shift leader, admin
    assignedTables: [String]
})

const userModel = mongoose.model("User", userSchema, "User")

module.exports = userModel