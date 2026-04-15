const mongoose = require('mongoose')
const mongosrv = require('mongodb-memory-server')
const app = require('../server.js')
const tableModel = require('../models/tableModel.js')
const chaiHttp = require('chai-http')
const {expect} = require('chai')
const {generateAccessToken} = require('../utils/jwt.util.js')

describe("Bar Item Management", () => {

    //create in-memory db server for tests
    let mongoServer;
    let mongoClient;
    let mongooseClient;

    before(
        async function () {
            mongoServer = await mongosrv.MongoMemoryServer.create() 
            mongooseClient = await mongoose.connect(mongoServer.getUri(), {dbName: 'TestWaiterApp'})
        
        const firstTable = new tableModel({
                id: 1, 
                waiterId: 1, 
                deliveredAt: "", 
                orderTakenAt: "", 
                name: "Table 1", 
                isActive: true, 
                barItems: [{
                    id: 1, 
                    item: "Vodka Juice", 
                    isDelivered: false
                }, {
                    id: 2, 
                    item: "Jagger", 
                    isDelivered: false
                }], 
                kitchenItems:[{
                    id: 1, 
                    item: "Smashed burger", 
                    isDelivered: false
                }, {
                    id: 2, 
                    item: "Caesar salad", 
                    isDelivered: false
                }]    
            })
            const secondTable = new tableModel({
                id: 2, 
                waiterId: 2, 
                deliveredAt: "", 
                orderTakenAt: "", 
                name: "Table 2", 
                isActive: true, 
                barItems: [{
                    id: 1, 
                    item: "Vodka Juice", 
                    isDelivered: false
                }], 
                kitchenItems:[{
                    id: 1, 
                    item: "Smashed burger", 
                    isDelivered: false
                }, {
                    id: 2, 
                    item: "Caesar salad", 
                    isDelivered: false
                }]
            })
            const thirdTable = new tableModel({
                id: 3,
                waiterId: 1, 
                deliveredAt: "", 
                orderTakenAt: "", 
                name: "Table 3", 
                isActive: true, 
                barItems: [{
                    id: 1, 
                    item: "Vodka Juice", 
                    isDelivered: false
                }, {
                    id: 2, 
                    item: "Jagger", 
                    isDelivered: false
                }], 
                kitchenItems:[]
            })

            await firstTable.save()
            await secondTable.save()
            await thirdTable.save()

        }
    )

    after(
        async function () {
            if(mongoClient){
                await mongoClient.close()
            }
            if(mongoServer){
                await mongoServer.stop()
            }
            if(mongooseClient){
                await mongooseClient.disconnect()
            }
        }
    )

    describe('add a new item to the list', () => {    
        const temporaryAccessToken = generateAccessToken({
                        id: 1,
                        name: 'Test1'
                    })

        it('should add a bar item to the table with id 1', (done) => {
            chaiHttp.request.execute(app)
                .post('/table/1/newItem')
                .send({
                    type: 'bar',
                    item: 'test item'
                })
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.status).to.equal(200)
                    expect(res.body.type).to.equal('bar')
                    expect(res.body.items).to.be.an('array')
                    expect(res.body.items[res.body.items.length - 1].item).to.equal('test item')

                    done()
                })
            }
        )

        it('should add a kitchen item to the table with id 1', (done) => {
            chaiHttp.request.execute(app)
                .post('/table/1/newItem')
                .send({
                    type: 'kitchen',
                    item: 'test item'
                })
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.status).to.equal(200)
                    expect(res.body.type).to.equal('kitchen')
                    expect(res.body.items).to.be.an('array')
                    expect(res.body.items[res.body.items.length - 1].item).to.equal('test item')

                    done()
                })
        })
    })

    describe('update an existing bar item', () => {
        const temporaryAccessToken = generateAccessToken({
                        id: 1,
                        name: 'Test1'
                    })
        it('should update the test item from barItems', (done) => {
            chaiHttp.request.execute(app)
                .patch('/tables/1/bar/1')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .send({
                    item: 'updated item'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.status).to.equal(200)
                    const newItems = res.body
                    let newItemFound = false
                    newItems.forEach(item => {
                        if(item.item === "updated item"){
                            newItemFound = true
                            return
                        }
                    })
                    expect(newItemFound).to.be.true
                    done()
                })
            }
        )

        it('should update the test item from kitchenItems', (done) => {
            chaiHttp.request.execute(app)
                .patch('/tables/1/kitchen/1')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .send({
                    item: 'updated item'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.status).to.equal(200)
                    const newItems = res.body
                    let newItemFound = false
                    newItems.forEach(item => {
                        if(item.item === "updated item"){
                            newItemFound = true
                            return
                        }
                    })
                    expect(newItemFound).to.be.true
                    done()
                })
            }
        )

        it('should return status 404 if table id is invalid', (done) => {
            chaiHttp.request.execute(app)
                .patch('/tables/10/bar/1')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .send({})
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    done()
                })
        })

        it('should return status 404 if item id is invalid', (done) => {
            chaiHttp.request.execute(app)
                .patch('/tables/1/bar/10')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .send({
                    item: 'item'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    done()
                })
        })

        it('should return status code 400 if body is empty', (done) => {
            chaiHttp.request.execute(app)
                .patch('/tables/1/bar/1')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .send({})
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    done()
                })
        })
    })

    describe('delete an existing item', () => {
        const temporaryAccessToken = generateAccessToken({
                        id: 1,
                        name: 'Test1'
                    })
        it('should return status code 404 when table is not found', (done) => {
            chaiHttp.request.execute(app)
                .delete('/tables/10/bar/1')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    done()
                })
        })

        it('should return status code 404 when item is not found', (done) => {
            chaiHttp.request.execute(app)
                .delete('/tables/1/bar/11')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    done()
                })
        })

        it('should delete the test item with id 1 from barItems', (done) => {
            chaiHttp.request.execute(app)
                .delete('/tables/1/bar/1')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body.length).to.equal(2)
                    done()
                })
        })

        it('should delete the test item with id 1 from kitchenItems', (done) => {
            chaiHttp.request.execute(app)
                .delete('/tables/1/kitchen/1')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body.length).to.equal(2)
                    done()
                })
        })
    })

    describe('deliver an item', () => {
        const temporaryAccessToken = generateAccessToken({
                        id: 1,
                        name: 'Test1'
                    })

        it('should deliver bar item with id 2 from table with id 1', async () => {
            const tableWithId1 = await tableModel.findOne({id: 1})
            const itemBeforeDelivery = tableWithId1.barItems[1]
            expect(itemBeforeDelivery.id).to.equal(2)
            expect(itemBeforeDelivery.isDelivered).to.be.false

            chaiHttp.request.execute(app)
                .patch('/tables/1/bar/2/deliver')
                .send({
                    isDelivered: true
                })
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    const updatedBarItems = res.body
                    expect(updatedBarItems[1].id).to.equal(2)
                    expect(updatedBarItems[1].isDelivered).to.be.true
                })

            chaiHttp.request.execute(app)
                .patch('/tables/1/bar/2/deliver')
                .send({
                    isDelivered: false
                })
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    const updatedBarItems = res.body
                    expect(updatedBarItems[1].id).to.equal(2)
                    expect(updatedBarItems[1].isDelivered).to.be.false
                })
        })

        it('should deliver kitchen item with id 2 from table with id 1', async () => {
            const tableWithId1 = await tableModel.findOne({id: 1})
            const itemBeforeDelivery = tableWithId1.kitchenItems[1]
            expect(itemBeforeDelivery.id).to.equal(2)
            expect(itemBeforeDelivery.isDelivered).to.be.false

            chaiHttp.request.execute(app)
                .patch('/tables/1/kitchen/2/deliver')
                .send({
                    isDelivered: true
                })
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    const updatedKitchenItems = res.body
                    expect(updatedKitchenItems[1].id).to.equal(2)
                    expect(updatedKitchenItems[1].isDelivered).to.be.true
                })

            chaiHttp.request.execute(app)
                .patch('/tables/1/kitchen/2/deliver')
                .send({
                    isDelivered: false
                })
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    const updatedKitchenItems = res.body
                    expect(updatedKitchenItems[1].id).to.equal(2)
                    expect(updatedKitchenItems[1].isDelivered).to.be.false
                })
        })
    })
    
})
