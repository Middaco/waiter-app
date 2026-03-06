import { createServer, Model } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      terrarium: Model,
    },
  
    seeds(server){
      server.create("terrarium", { id:1, name:'terrarium 1', details:'details for terrarium 1', showDetails: false })
      server.create("terrarium", { id:2, name:'terrarium 2', details:'details for terrarium 2', showDetails: false })
      server.create("terrarium", { id:3, name:'terrarium 3', details:'details for terrarium 3', showDetails: false })
    },

    routes() {
      this.namespace = "api";

      this.get("/terrariums", (schema) => {
        return schema.all("terrarium");
      });

      this.post("/addTerrariums", (schema, request) => {
        let terrariumAttributes = JSON.parse(request.requestBody);
        return schema.create("terrarium", terrariumAttributes);
      });

      this.delete("/terrariums/:id", (schema, request) => {
        let id = request.params.id;
        schema.find("terrarium", id).destroy();
        return {};
      });

      this.put("/update/:id", (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);

        schema.find("terrarium", id).update(attrs);

        return {};
      });
    },
  })

  return server;
}