const mongoose = require('mongoose')
const mongosrv = require('mongodb-memory-server')
const app = require('../server.js')
const chaiHttp = require('chai-http')
const userModel = require('../models/userModel.js')
const {expect} = require('chai')

//create in-memory db server for tests
let mongoServer;
let mongooseClient;

describe("LogIn test", () => {

    before(
        async () => {
            mongoServer = await mongosrv.MongoMemoryServer.create()
            mongooseClient = await mongoose.connect(mongoServer.getUri(), {dbName: 'TestWaiterApp'})
        
            const user1 = new userModel({id: 123, name: 'admin', role: 'admin'})
            const user2 = new userModel({id: 456, name: 'test waiter', role: 'waiter'})
            
            await userModel.bulkSave([user1, user2])
        }
    )

    after(
        async () => {
            if(mongooseClient){
                await mongooseClient.disconnect()
            }
            if(mongoServer){
                await mongoServer.stop()
            }
        }
    )

    //test the login functionality
    describe('POST /login', () => {
        it('should return 200 when user exists', (done) =>{
            chaiHttp.request.execute(app)
                .post('/login')
                .send({userCode: '123'})
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    done()
                })
        })

        it('should return 404 when user does not exist', (done) => {
            chaiHttp.request.execute(app)
                .post('/login')
                .send({userCode: '999'})
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    expect(res.text).to.equal("User doesn't exist")
                    done()
                })
        })

        it('should return an error code when users pass anything but a number', (done) => {
            chaiHttp.request.execute(app)
                .post('/login')
                .send({userCode: '12.u4'})
                .end((err, res) => {
                    expect(res.status).to.equal(500)
                    expect(res.text).to.equal("The passed code is not a number")
                    done()
                })
        })
    })

})