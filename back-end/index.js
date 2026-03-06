var express = require('express')
var app = express()
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose')

var terrariumRoutes = require('./routes/terrarium.routes');
var userRoutes = require('./routes/user.routes')
var cartRoutes = require('./routes/cart.routes')
const port = 4000

dotenv.config();
process.env.TOKEN_SECRET;
process.env.REFRESH_TOKEN_SECRET;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use("/terrariums", terrariumRoutes);
app.use("/user", userRoutes)
app.use("/cart", cartRoutes)



mongoose.connect("mongodb+srv://bogdan02081:Biancaevtm1.@cluster0.an2wmdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected!")
    app.listen(port, () => {
        console.log(`Example app listenint on port ${port}`)
    })
})