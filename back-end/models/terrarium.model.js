const mongoose = require('mongoose')
const schema = mongoose.Schema

const TerrariumSchema = new schema({
    name:{
        type: String,
        required: true
    },
    details:{
        type: String
    },
    showDetails:{
        type: Boolean
    },
    image:{
        type: String
    },
    price:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Terrarium", TerrariumSchema)