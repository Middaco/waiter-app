const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    refreshToken:{
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", UserSchema)