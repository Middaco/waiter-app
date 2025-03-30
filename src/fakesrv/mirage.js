import { createServer, Model } from "miragejs";

export default createServer({
    models:{
        table: Model,
    },

    seeds(server) {
        server.create("table", { id: 1, name: "Table 1", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
        server.create("table", { id: 2, name: "Table 2", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
        server.create("table", { id: 3, name: "Table 3", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
        server.create("table", { id: 4, name: "Table 4", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
        server.create("table", { id: 5, name: "Table 5", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
        server.create("table", { id: 6, name: "Table 6", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
        server.create("table", { id: 7, name: "Table 7", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
        server.create("table", { id: 8, name: "Table 8", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
        server.create("table", { id: 9, name: "Table 9", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
        server.create("table", { id: 10, name: "Table 10", isActive: true, noBarItems: 5, noKitchenItems: 3, barItems: [{id: 1, item: "Vodka Juice", isDelivered: false}, {id: 2, item: "Jagger", isDelivered: false}, {id: 3, item: "Unicum", isDelivered: false}, {id: 4, item: "Monchoff Hell", isDelivered: false}, {id: 5, item: "Taergeneser", isDelivered: false}], kitchenItems:[{id: 1, item: "Smashed burger", isDelivered: false}, {id: 2, item: "Caesar salad", isDelivered: false}, {id: 3, item: "Cheeseburger", isDelivered: false}], timer: 10 });
    },

    routes() {
        this.get("/api/tables", (schema) => {
            return schema.tables.all()
        })

        this.post("/api/tables", (schema) => {
            const newId = schema.tables.all().length + 1
            const newTable = {
                id: newId, name: ``,
                isActive: true, 
                noBarItems: 0, 
                noKitchenItems: 0, 
                barItems: [], 
                kitchenItems: [], 
                timer: 10
            }
            console.log(newTable)
            schema.tables.create(newTable)
            return newTable
        })

        this.delete("api/tables/:tableId/bar/:itemId", (schema, request) => {
            const table = schema.tables.find(request.params.tableId)
            const barItems = table.barItems            
            barItems.splice(barItems.findIndex(item => item.id === request.params.itemId), 1)
            table.update({noBarItems: table.noBarItems -= 1})
            return barItems
        })

        this.delete("api/tables/:tableId/kitchen/:itemId", (schema, request) => {
            const table = schema.tables.find(request.params.tableId)
            const kitchenItems = table.kitchenItems            
            kitchenItems.splice(kitchenItems.findIndex(item => item.id === request.params.itemId), 1)
            table.update({noKitchenItems: table.noKitchenItems -= 1})
            return kitchenItems
        })

        this.post("/api/table/:id/newItem", (schema, request) =>{
            const tableId = request.params.id
            const type = request.requestBody.type
            console.log(request.requestBody)
            const table = schema.tables.find(tableId)
            if(type === "bar"){ 
                const newId = table.barItems.length + 1
                table.barItems.push({id: newId, item: request.requestBody.item, isDelivered: false})
                table.update({noBarItems: table.noBarItems + 1})
                return table.barItems
            }
            const newId = table.kitchenItems.length + 1
            table.kitchenItems.push({id: newId, item: request.requestBody.item, isDelivered: false})
            table.update({noKitchenItems: table.noKitchenItems + 1})
            return table.kitchenItems
        })

        this.get("/api/tables/:id", (schema, request) => {
            let id = request.params.id
            return schema.tables.find(id)
        })

        this.get("/api/tables/:id/bar", (schema, request) => {
            const id = request.params.id
            return schema.tables.find(id).barItems
        })

        this.post("/api/tables/:id/bar", (schema, request) => {
            const tableId = request.params.id
            console.log(JSON.parse(request.requestBody))
            const index = JSON.parse(request.requestBody)[1]
            const newItem = JSON.parse(request.requestBody)[0]
            newItem.id = schema.tables.find(tableId).barItems.length + 1
            console.log(newItem)

            schema.tables.find(tableId).barItems.splice(index, 0, newItem)
            return schema.tables.find(tableId).barItems
        })

        this.get("/api/tables/:id/kitchen", (schema, request) => {
            const id = request.params.id
            return schema.tables.find(id).kitchenItems
        })
        
        this.post("/api/tables/:id/name", (schema, request) => {
            const id = request.params.id
            const newName = JSON.parse(request.requestBody).name
            let table = schema.tables.find(id)
            table.update({ name: newName })
            return table
        })

        this.post("api/tables/:id/bar/:itemId/deliver", (schema, request) => {
            const id = JSON.parse(request.params.id);
            const barItemId = JSON.parse(request.params.itemId);
            const table = schema.tables.find(id)
            const barItem = table.barItems.find(item => item.id === barItemId)
            table.update({
                barItems: table.barItems.map(
                    item => item.id === barItemId ? {...item, isDelivered: !item.isDelivered} : item
                ),
                noBarItems: barItem.isDelivered ? table.noBarItems + 1 : table.noBarItems - 1 
            })
            return table
        })

        this.post("api/tables/:id/kitchen/:itemId/deliver", (schema, request) => {
            const id = JSON.parse(request.params.id);
            const kitchenItemId = JSON.parse(request.params.itemId);
            const table = schema.tables.find(id)
            const kitchenItem = table.kitchenItems.find(item => item.id === kitchenItemId)
            table.update({
                kitchenItems: table.kitchenItems.map(
                    item => item.id === kitchenItemId ? {...item, isDelivered: !item.isDelivered} : item
                ),
                noKitchenItems: kitchenItem.isDelivered ? table.noKitchenItems + 1 : table.noKitchenItems - 1 
            })
            return table
        })
    }
})