const request = require('supertest')
const mongoose = require('mongoose')
const mongosrv = require('mongodb-memory-server')
const client = require('mongodb')

//create in-memory db server for tests
let mongoServer;
let mongoClient;

beforeAll(
    async () => {
        mongoServer = await mongosrv.MongoMemoryServer.create()
        mongoClient = await client.MongoClient.connect(mongoServer.getUri())
    }
)

afterAll(
    async () => {
        if(mongoClient){
            await mongoClient.close()
        }
        if(mongoServer){
            await mongoServer.stop()
        }
    }
)

//test the created db to check it's availability
describe('Define and use mongo-memory-server', () => { 
    it('should define a database', () => {
        const db = mongoClient.db(mongoServer.instanceInfo?.dbName);
        expect(db).toBeDefined();
    })

    it('should insert data', async () => {
        const db = mongoClient.db(mongoServer.instanceInfo?.dbName);
        const col = db.collection('Table')
        const result = await col.insertMany([
            { id: 1, deliveredAt: "", orderTakenAt: 1, name: "Table 1", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 },
            { id: 2, deliveredAt: "", orderTakenAt: 1, name: "Table 2", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 }
        ])
        expect(result.insertedCount).toBe(2)
        expect(await col.countDocuments({})).toBe(2)
    })
})