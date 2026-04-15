const express = require('express')
const userModel = require('../models/user.model')
const tableModel = require('../models/table.model')
const { authenticateToken } = require('../utils/jwt.util')
const userRouter = express.Router()

userRouter.use(authenticateToken)

userRouter.patch('/assignTable/:_id', async (req, res) => {
    const userId = req.params._id
    const tableId = req.body.tableId
    const user = await userModel.findOne({_id: userId})
    if(!user){
        return res.status(404).send('User not found')
    }

    user.assignedTables.push(tableId)
    await user.save()

    await tableModel.findOneAndUpdate({_id: tableId}, {assigned: true})

    res.status(200).send(user)
})

userRouter.patch('/unassignTable/:_id', async (req, res) => {
    const userId = req.params._id
    const tableId = req.body.tableId
    const user = await userModel.findOne({_id: userId})
    if(!user){
        return res.status(404).send('User not found')
    }

    const indexOfTableToUnassign = user.assignedTables.findIndex(currentTableId => currentTableId === tableId)
    if(indexOfTableToUnassign === -1){
        return res.status(404).send('Table not found')
    }

    user.assignedTables.splice(indexOfTableToUnassign, 1)
    await user.save()
    await tableModel.findOneAndUpdate({_id: tableId}, {assigned: false})

    res.status(200).send(user)
})

//GET waiters and shift leaders
userRouter.get('/waiters', async (req, res) => {
    const waitersList = await userModel.find({$or:[{role: 'waiter'}, {role: 'shiftLeader'}]})
    res.status(200).send(waitersList)
})

//create a new user
userRouter.post('/user', async (req, res) => {
    const {name, role, id} = req.body
    const newUser = new userModel({
        id: id,
        name: name,
        role: role
    })
    await newUser.save()
    return res.status(200).send(newUser)
})

//get all users
userRouter.get('/users', async (req, res) => {
    const users = await userModel.find({})
    res.status(200).send(users)
})

//delete one user
userRouter.delete('/user/:_id', async(req, res) => {
    const userId = req.params._id
    const deletedUser = await userModel.findOneAndDelete({_id: userId})
    if(!deletedUser){
        return res.status(404).send('User not found')
    }
    res.status(200).send(deletedUser)
})

userRouter.patch('/user/:_id', async(req, res) => {
    const userId = req.params._id
    const newName = req.body.name
    const newRole = req.body.role
    const newAccessCode = req.body.id
    
    const userBeforeUpdate = await userModel.findOneAndUpdate({_id: userId}, {name: newName, role: newRole, id: newAccessCode})

    if(!userBeforeUpdate){
        return res.status(404).send('User not found')
    }

    res.status(200).send(userBeforeUpdate)
})


module.exports = {userRouter}