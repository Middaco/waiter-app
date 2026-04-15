const mongoose = require('mongoose')
const mongosrv = require('mongodb-memory-server')
const app = require('../server.js')
const tableModel = require('../models/tableModel.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
const {expect} = require('chai')
const { generateAccessToken } = require('../utils/jwt.util.js')

describe('Tables Management', () => {
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

    describe('Get all tables of a specific user', () => {
        it('should return status 400 for not providing an access token', (done) => {
            chaiHttp.request.execute(app)
                .get('/tables')
                .send({})
                .end((err, res)=>{
                    expect(res.status).to.equal(400)

                    done()
                })
        })

        it('should return status 403 for providing an invalid access token', (done) => {
            chaiHttp.request.execute(app)
                .get('/tables')
                .set('Content-Type', 'application/json')
                .set('authorization', "Bearer invalid")
                .send({})
                .end((err, res)=>{
                    expect(res.status).to.equal(403)

                    done()
                })
        })

        it('should retrieve a list of tables for a specific user', (done) => {
            const temporaryAccessToken = generateAccessToken({
                id: 1,
                name: 'Test1'
            })

            chaiHttp.request.execute(app)
                .get('/tables')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body.length).to.equal(2)
                    expect(res.body[0].id).to.equal(1)
                    expect(res.body[0].waiterId).to.equal(1)
                    expect(res.body[1].id).to.equal(3)
                    expect(res.body[1].waiterId).to.equal(1)

                    done()
                })
        })
    })

    describe('Get a specific table of a specific user', ()=>{
        const temporaryAccessToken = generateAccessToken({
                id: 1,
                name: 'Test1'
            })

        it('should return status 404 if the table id is not found', (done) => {
            chaiHttp.request.execute(app)
                .get('/tables/12')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    done()
                })
        })

        it('should return status 404 if the user does not have access to the specified table', (done) => {
            chaiHttp.request.execute(app)
                .get('/tables/2')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .set('content-type', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    done()
                })
        })

        it('should return table with id 1', (done) => {
            chaiHttp.request.execute(app)
                .get('/tables/1')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .set('content-type', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    
                    const table = res.body
                    expect(table.id).to.equal(1)
                    expect(table.name).to.equal('Table 1')

                    done()
                })
        })
    })

    describe('Create tables', ()=>{
        const temporaryAccessToken = generateAccessToken({
                id: 1,
                name: 'Test1'
            })

        it('should return an empty table', (done) => {
            chaiHttp.request.execute(app)
                .post('/tables')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)

                    const table = res.body
                    expect(table.waiterId).to.equal(1)
                    expect(table.name).to.be.empty
                    expect(table.deliveredAt).to.be.empty
                    expect(table.orderTakenAt).to.be.a('String')
                    expect(table.isActive).to.be.true
                    expect(table.barItems).to.be.an('array')
                    expect(table.barItems).to.be.empty
                    expect(table.kitchenItems).to.be.an('array')
                    expect(table.kitchenItems).to.be.empty

                    done()
                })
        })

        it('last table should be available on the db', async() => {
            const previouslyPushedTable = await tableModel.findOne({id: 4})

            expect(previouslyPushedTable).to.exist
            expect(previouslyPushedTable).to.be.an('object')
            expect(previouslyPushedTable.name).to.be.empty
        })
    })

    describe('Delete tables', () => {
        const temporaryAccessToken = generateAccessToken({
                id: 1,
                name: 'Test1'
            })

        it('should return status 404 if the table id is not found', (done) => {
            chaiHttp.request.execute(app)
                .delete('/table/4')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(404)

                    done()
                })
        })

        it('should return status 404 if the user does not have access to the specified table', (done) => {
            const wrongUser = { id: 2, name: 'Wrong Chan' }
            const validAccessToken = generateAccessToken(wrongUser)

            chaiHttp.request.execute(app)
                .delete('/table/4')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${validAccessToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(404)

                    done()
                })
        })

        it('should delete the last saved table', () => {
            chaiHttp.request.execute(app)
                .delete('/table/4')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end(async(err, res) => {
                    expect(res.status).to.equal(200)
                    
                    const tableThatShouldBeNull = await tableModel.findOne({id: 4})
                    expect(tableThatShouldBeNull).to.be.null
                })
        })
    })

    describe('Update tables', () => {
        const temporaryAccessToken = generateAccessToken({
                id: 1,
                name: 'Test1'
            })

        it('should return status 404 if the table id is not found', (done) => {
            chaiHttp.request.execute(app)
                .post('/tables/5/name')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .send({
                    name: 'Updated name'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(404)

                    done()
                })
        })

        it('should return status 404 if the user does not have access to the specified table', (done) => {
            const wrongUser = { id: 2, name: 'Wrong Chan' }
            const validAccessToken = generateAccessToken(wrongUser)
            
            chaiHttp.request.execute(app)
                .post('/tables/4/name')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${validAccessToken}`)
                .send({
                    name: 'Updated name'
                })
                .end((err, res) => {
                    expect(res.status).to.equal(404)

                    done()
                })
        })
        
        it('should set the name of the requested table', () => {
            chaiHttp.request.execute(app)
                .post('/tables/3/name')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .send({
                    name: 'Updated name'
                })
                .end(async (err, res) => {
                    expect(res.status).to.equal(200)

                    expect(res.body.name).to.equal('Table 3')
                    const updatedTable = await tableModel.findOne({id: 3})
                    expect(updatedTable.name).to.equal('Updated name')
                })
        })

        it('should stop the timer of the requested table', () => {
            chaiHttp.request.execute(app)
                .post('/tables/3/name')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${temporaryAccessToken}`)
                .end(async (err, res) => {
                    expect(res.status).to.equal(200)
                    
                    const tableBeforeUpdate = res.body
                    
                    expect(tableBeforeUpdate.deliveredAt).to.be.a('string')
                    expect(tableBeforeUpdate.deliveredAt).to.be.empty
                    expect(tableBeforeUpdate.isActive).to.be.true

                    const tableAfterUpdate = await tableModel.findOne({id: 3})

                    expect(tableAfterUpdate.deliveredAt).to.be.a('string')
                    expect(tableAfterUpdate.deliveredAt).to.not.be.empty
                    expect(tableAfterUpdate.isActive).to.be.false
                })
        })
    })
})