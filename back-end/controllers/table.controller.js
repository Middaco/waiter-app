const express = require('express')
const tableModel = require('../models/table.model')

const { authenticateToken } = require('../utils/jwt.util')

const tableRouter = express.Router()
tableRouter.use(authenticateToken)

tableRouter.delete('/tables/:id', async(req, res) => {
    console.log(req)
    const tableId = req.params.id
    console.log(tableId)
    const deletedTable = await tableModel.findOneAndDelete({_id: tableId})

    if(!deletedTable){
        return res.status(404).send('Table not found')
    }

    res.status(200).send(deletedTable)
})

tableRouter.post('/tables', async(req, res) => {
    const newTableName = req.body.name
    const newTable = new tableModel({
        name: newTableName
    })

    await newTable.save()
    res.status(200).send(newTable)
})

//GET ALL tables
tableRouter.get('/tables', async(req, res) => {
    const tables = await tableModel.find({})
    res.status(200).send(tables)
})

//UPDATE table name of a certain table
//identified by it's ID
//TODO: validation for name
tableRouter.patch('/tables/:id', async(req, res) => {
    const tableId = req.params.id
    const newName = req.body.name

    const table = await tableModel.findOneAndUpdate({_id: tableId}, {name: newName})

    if(!table){
        return res.status(404).send('No such table found')
    }

    res.status(200).send(table)
})

module.exports = tableRouter
