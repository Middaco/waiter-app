const terrariumModel = require("../models/terrarium.model");

class TerrariumController{

    existsTerrarium = async (jsonData) => {
        const terrarium = await terrariumModel.findOne({name: jsonData.name}).exec();
        if(!terrarium){
            return false
        }
        return true;
    }

    getAllTerrariumsPaginated = async (req, res) => {
        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);

        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        const terrariums = await terrariumModel.find({});
        const paginatedTerrariums = terrariums.slice(startIndex, endIndex);

        const totalPages = Math.ceil(terrariums.length / pageSize);

        res.status(200).send({paginatedTerrariums, totalPages});
    }

    getAllTerrariums = async (req, res) => {
        const terrariums = await terrariumModel.find({})
        res.send(terrariums)
    }

    isDataValid(jsonData){
        if(jsonData.name.length == 0){
            return false;
        }
        if(jsonData.details.length == 0){
            return false;
        }
        return true;
    }

    addTerrarium = async (req, res) => {
        try{
            if(this.isDataValid(req.body)){
                const terrariumExists = await this.existsTerrarium(req.body)
                if(terrariumExists){
                    throw console.error("Terrarium already exists");
                }else{
                    console.log(req.body.price)
                    const Terrarium = await terrariumModel.create(req.body)
                    res.status(200).send(Terrarium)
                }
            }else{
                throw console.error("Terrarium is not valid");
            }
        }catch(error){
            res.status(500).json({message: error.message})
        }
        
    }

    deleteTerrarium = async (req, res) => {
        try{
            const id = req.params.id;

            const terrarium = await terrariumModel.findByIdAndDelete(id)

            if(!terrarium){
                res.status(404).json({message: "Terrarium not found!"})
            }

            res.status(200).send("Success delete!");
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    updateTerrarium = async (req, res) => {
        try{
            const {id} = req.params

            const terrarium = await terrariumModel.findByIdAndUpdate(id, req.body)

            if(!terrarium){
                res.status(404).json({message: "Terrarium not found!"})
            }

            const updatedTerrarium = await terrariumModel.findById(id)
            res.status(200).send(updatedTerrarium);
        }catch(error){
            res.status(500).json({message: error.message})
        }

        
    }
}

module.exports = new TerrariumController();