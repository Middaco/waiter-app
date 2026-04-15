const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
    name: String, 
    assigned: {
        type: Boolean,
        default: false
    }
})

const tableModel = mongoose.model("Table", tableSchema, "Table")

module.exports = tableModel