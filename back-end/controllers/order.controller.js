const express = require('express')
const tableModel = require('../models/table.model')
const orderModel = require('../models/order.model')
const { authenticateToken } = require('../utils/jwt.util')

const orderRouter = express.Router()

orderRouter.use(authenticateToken)

const canTableBeClosed = (table) => {
    if(table.noBarItems === 0 && table.noKitchenItems === 0){
        table.isActive = false
        table.deliveredAt = new Date().toISOString()
        console.log(table)
        return true
    }
    return false
}

//TODO: create a new table for statistics where
//you store: userId, tableId, openedAt, closedAt, totalTime
//Translation: The user userId opened the table tableId at
//openedAt, closed it at closedAt. The total time required
//for this round of serving was totalTime
orderRouter.get("/orders/:tableId", async (req, res) => {
    const tableId = req.params.tableId

    const orders = await orderModel.find({tableId: tableId});

    if(!orders){
        return res.status(404).send("No orders available")
    }

    res.status(200).send(orders)
})

//STOPS the timer of a table identified by it's id
//and the user Id
orderRouter.patch("/tables/:id/stopTimer", async (req, res) => { 
    const tableId = + req.params.id
    const userId = + req.user.id
    
    const updatedTable = await orderModel.findOneAndUpdate({tableId: tableId, waiterId: userId}, {deliveredAt: new Date().toISOString(), isActive: false})

    if(!updatedTable){
        res.status(404).send('No such table found')
    }

    res.status(200).send(updatedTable)
})

//GET ALL orders of a specific user
//user is set in the rerquest's body by the middleware
orderRouter.get('/orders', async (req, res) => {
    const userId = req.user._id
    const orders = await orderModel.find({waiterId: userId})
    res.status(200).send(orders)
});

//GET ONE order matching that contains the 
//requested tableId and userId
orderRouter.get("/orders/:id", async (req, res) => {
    const tableId = + req.params.id
    const userId = req.user._id
    const order = await orderModel.findOne({tableId: tableId, waiterId: userId})
    if(!order){
        return res.status(404).send('Could not find the specified order')
    }
    res.status(200).send(order);
});

//creates a new order for a specified table
orderRouter.post("/orders", async (req, res) => {
    const userId = req.user._id
    const newOrder = new orderModel ({
        tableId: "", 
        waiterId: userId,
        deliveredAt: "",
        orderTakenAt: new Date().toISOString(),
        isActive: true, 
        barItems: [], 
        kitchenItems: [], 
    });
    newOrder.save()
    res.status(200).send(newOrder);
})

//SET the table of an order
orderRouter.patch('/order/:orderId/table', async (req, res) => {
    const { orderId } = req.params
    const { tableId } = req.body

    const order = await orderModel.findOneAndUpdate({_id: orderId}, {tableId: tableId})

    if(!order){
        return res.status(404).send('Order not found')
    }

    res.status(200).send(order)
})

//delete the requested order identified by 
//the table's id and the user's id
//TODO: I could move the table's id inside the request's body
orderRouter.delete('/orders/:id', async (req, res) => {
    const orderId = req.params.id

    const deletedOrder = await orderModel.findOneAndDelete({_id: orderId})
    if(!deletedOrder){
        return res.status(404).send('Order not found')
    }
    console.log(deletedOrder)
    return res.status(200).send(deletedOrder)
})

//update the bar item of the table with id tableId
//the bar item has the id itemId
//!! it doesn't return isDelivered, is that a problem?
orderRouter.patch("/orders/:orderId/bar/:itemId", async (req, res) =>{
    const { orderId, itemId } = req.params
    
    const order = await orderModel.findOne({_id: orderId})
    const { newItem } = req.body

    if(!order){
        return res.status(404).send('Table not found')
    }

    if(!newItem){
        return res.status(400).send('No data was sent')
    }

    let foundItem = false;

    const newBarItems = order.barItems.map(item => {
        if(itemId == item._id){
            item.item = newItem
            item.isDelivered = false
            foundItem = true
        }
        return item
    })

    if(!foundItem){
        return res.status(404).send('Item not found')
    }

    await order.updateOne({baritems: newBarItems}).exec()
    await order.save()
    res.status(200).send(order.barItems)
})

//UPDATE the item with ID itemId from the order
//with table's id tableId and waiterId accordingly to
//the access token
orderRouter.patch("/orders/:orderId/kitchen/:itemId", async (req, res) =>{
    const { orderId, itemId } = req.params
    
    const order = await orderModel.findOne({_id: orderId}).exec()
    const { newItem } = req.body

    if(!order){
        return res.status(404).send('Table not found')
    }

    if(!newItem){
        return res.status(400).send('No data was sent')
    }

    let foundItem = false;

    const newKitchenItems = order.kitchenItems.map(item => {
        if(itemId == item._id){
            item.item = newItem
            item.isDelivered = false
            foundItem = true
        }
        return item
    })

    if(!foundItem){
        return res.status(404).send('Item not found')
    }

    await order.updateOne({kitchenItems: newKitchenItems}).exec()
    await order.save()
    res.status(200).send(order.kitchenItems)
})

//deletes an Item from the list of bar items
//it uses tableId to find the table and itemId to find the item
//TODO: it Should check if the table can be closed
orderRouter.delete("/orders/:orderId/bar/:itemId", async (req, res) => {
    const { orderId } = req.params
    
    const order = await orderModel.findOne({_id: orderId})
    
    if(!order){
        return res.status(404).send('Table not found')
    }

    const indexOfBarItemToDelete = order.barItems.findIndex(item => item._id.toString() === req.params.itemId)

    if(indexOfBarItemToDelete === -1){
        return res.status(404).send('Item not found')
    }
    
    order.barItems.splice(indexOfBarItemToDelete, 1)
    await order.save()
    
    return res.status(200).send(order.barItems)
})

orderRouter.delete("/orders/:orderId/kitchen/:itemId", async (req, res) => {
    const { orderId }= req.params

    const order = await orderModel.findOne({_id: orderId})

    if(!order){
        return res.status(404).send('Table not found')
    }

    const indexOfKitchenItemToDelete = order.kitchenItems.findIndex(item => item._id.toString() === req.params.itemId)

    if(indexOfKitchenItemToDelete === -1){
        return res.status(404).send('Item not found')
    }
    
    order.kitchenItems.splice(indexOfKitchenItemToDelete, 1)
    await order.save()

    return res.status(200).send(order.kitchenItems)
})

//add a new item to the items list
//once the new item is stored in the db it will have a _id field that should be private
//res has to send something in order for tests to pass
orderRouter.post("/table/:id/newItem", async (req, res) =>{
    const orderId = req.params.id
    const { newItem, type} = req.body
    
    const order = await orderModel.findOne({_id: orderId})
    
    const barItems = order.barItems
    const kitchenItems = order.kitchenItems

    if(type === "bar"){ 
        const newId = order.barItems.length + 1
        barItems.push({id: newId, item: newItem, isDelivered: false})
        await orderModel.updateOne({_id: orderId}, {barItems: barItems}).exec()
        res.status(200).send({type: 'bar', items: barItems});
    }else{
        const newId = order.kitchenItems.length + 1
        kitchenItems.push({id: newId, item: newItem, isDelivered: false})
        await orderModel.updateOne({_id: orderId}, {kitchenItems: kitchenItems}).exec()
        res.status(200).send({type: 'kitchen', items: kitchenItems});
    }
    
})

//deliver an item with id :itemId from a table
//with id :id
orderRouter.patch("/orders/:id/bar/:itemId/deliver", async (req, res) => {
    const orderId = req.params.id;
    const barItemId = req.params.itemId;
    const isItemDelivered = req.body.isDelivered
    
    const order = await orderModel.findOne({_id: orderId})

    if(!order){
        return res.status(404).send('Order not found')
    }

    const barItemIndex = order.barItems.findIndex(item => item._id.toString() === barItemId)

    if(barItemIndex === -1){
        return res.status(404).send('No such bar item found')
    }

    order.barItems[barItemIndex].isDelivered = isItemDelivered
    await order.save()

    return res.status(200).send(order.barItems)

    //TODO: test this later
    if(canTableBeClosed(table)){
        res.status(201).send({success: true, message: "Table closed"})
    }else{
        res.status(200).send(table.barItems)
    }
})

orderRouter.patch("/orders/:id/kitchen/:itemId/deliver", async (req, res) => {
    const orderId = req.params.id;

    const kitchenItemId = req.params.itemId;
    const isItemDelivered = req.body.isDelivered

    const order = await orderModel.findOne({_id: orderId})

    if(!order){
        return res.status(404).send('Table not found')
    }
    console.log(kitchenItemId)
    const kitchemItemIndex = order.kitchenItems.findIndex(item => item._id.toString() === kitchenItemId)
    console.log(kitchemItemIndex)
    if(kitchemItemIndex === -1){
        return res.status(404).send('No such item fount')
    }

    order.kitchenItems[kitchemItemIndex].isDelivered = isItemDelivered
    await order.save()

    return res.status(200).send(order.kitchenItems)

    //TODO: test this later
    if(canTableBeClosed(table)){
        res.status(201).send({success: true, message: "Table closed"})
    }else{
        res.status(200).send(table.barItems)
    }
})

module.exports = {orderRouter}
