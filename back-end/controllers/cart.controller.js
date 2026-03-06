const cartModel = require('../models/cart.model')
const cartItemModel = require('../models/cartItem.model')
const jwt = require('jsonwebtoken');

const addToCart = async (req, res) => {
    //Take the id of the user from the provided token and check
    //whether it has a cart
    const header = req.headers['authorization']
    const token = header.split(' ')[1]
    let user = null
    try{
        user = jwt.verify(token, process.env.TOKEN_SECRET)
    }catch(error){
        res.status(501).send({error: error.message})
    }
    let cartOfCurrentUser = await cartModel.findOne({userID: user._id})
    if(!cartOfCurrentUser){
        cartOfCurrentUser = await cartModel.create({userID: user._id})
    }

    //check if the sent terrarium is already in the cart
    //if it is, increment the quantity
    const {terrariumID} = req.body
    const terrariumInCart = await cartItemModel.findOne({
        cartID: cartOfCurrentUser._id,
        terrariumID: terrariumID
    })
    const {terrariumPrice} = req.body
    if(terrariumInCart){
        const updatedTerrariumInCart = await cartItemModel.findOneAndUpdate({
            cartID: cartOfCurrentUser._id,
            terrariumID: terrariumID
        }, {quantity: terrariumInCart.quantity + 1, totalPrice: terrariumInCart.totalPrice + terrariumPrice})
        return res.status(200).send(updatedTerrariumInCart)
    }

    //Take the sent terrarium and create a cartItem
    const {terrariumName} = req.body
    const newTerrariumInCart = await cartItemModel.create({
        cartID : cartOfCurrentUser._id,
        terrariumID: terrariumID,
        name: terrariumName,
        quantity: 1,
        totalPrice: terrariumPrice
    })


    return res.status(200).send(newTerrariumInCart)
}

const getCart = async(req, res) => {
    //get the cart of the current user based on userID
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
    let user = null
    try{
        user = jwt.verify(token, process.env.TOKEN_SECRET)
    }catch(error){
        res.status(501).send({error: error.message})
    }
    let cartOfCurrentUser = await cartModel.findOne({userID: user._id})
    if(!cartOfCurrentUser){
        return res.status(300).send({error: 'empty cart'})
    }

    const listOfCartItems = await cartItemModel.find({cartID: cartOfCurrentUser._id})

    return res.status(200).send(listOfCartItems)
}

const removeFromCart = async(req, res) =>{
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
    let user = null
    try{
        user = jwt.verify(token, process.env.TOKEN_SECRET)
    }catch(error){
        res.status(501).send({error: error.message})
    }
    let cartOfCurrentUser = await cartModel.findOne({userID: user._id})
    if(!cartOfCurrentUser){
        return res.status(300).send({error: 'empty cart'})
    }
    const {itemID} = req.params

    const deletedItem = await cartItemModel.findOneAndDelete({cartID: cartOfCurrentUser._id, terrariumID: itemID})
    if(!deletedItem){
        return res.status(501).send({error: 'Item not found'})
    }
    res.status(200).send(deletedItem)
}

const updateCartItem = async(req, res) => {
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
    let user = null
    try{
        user = jwt.verify(token, process.env.TOKEN_SECRET)
    }catch(error){
        res.status(501).send({error: error.message})
    }
    let cartOfCurrentUser = await cartModel.findOne({userID: user._id})
    if(!cartOfCurrentUser){
        return res.status(300).send({error: 'empty cart'})
    }
    const {newQuantity} = req.body
    const {terrariumID} = req.body
    const {totalPrice} = req.body 
    const {oldQuantity} = req.body
    console.log(newQuantity)
    const pricePerUnit = totalPrice / oldQuantity 
    const newTotalPrice = pricePerUnit * newQuantity
    const updatedItem = await cartItemModel.findOneAndUpdate({cartID: cartOfCurrentUser._id, terrariumID: terrariumID},
        {quantity: newQuantity, totalPrice: newTotalPrice}
    )

    if(!updatedItem){
        return res.status(500).send({message: 'Terrarium not found'})
    }


    res.status(200).send(updatedItem)
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItem
}