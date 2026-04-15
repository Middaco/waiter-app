require('dotenv').config()
const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const mongoose = require("mongoose")
const {logInRouter} = require('./controllers/login.controller')
const {tokenRouter} = require('./controllers/token.controller')
const {userRouter} = require('./controllers/user.controller')
const {orderRouter} = require('./controllers/order.controller')
const {authenticateToken} = require('./utils/jwt.util')
const tableRouter = require('./controllers/table.controller')
const mongoDB = "mongodb+srv://midaco:Biancaevtm1.@cluster0.8jxo8ch.mongodb.net/WaiterNotes?retryWrites=true&w=majority&appName=Cluster0"

//set up app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//use all routers
app.use(logInRouter)
app.use(tokenRouter)
app.use(tableRouter)
app.use(userRouter)
app.use(orderRouter)

//set middleware function
app.use(authenticateToken)

app.post("/logout", async(req, res) => {

})



//start the server
app.listen(port, async () => {
    await mongoose.connect(mongoDB)
        .then(() => console.log("Connected to MongoDB"))
        .catch(error => console.log(error))
    console.log(mongoose.connection.name)
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;