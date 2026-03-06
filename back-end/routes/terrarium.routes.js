var express = require('express');
var terrariumController = require('../controllers/terrarium.controller.js');
const {verifyToken} = require('../controllers/user.controller.js')

const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.use(verifyToken)
router.use(jsonParser)

router.get("/", terrariumController.getAllTerrariums);
router.get("/paginated", terrariumController.getAllTerrariumsPaginated);
router.post("/", terrariumController.addTerrarium);
router.delete("/:id", terrariumController.deleteTerrarium);
router.put("/:id", terrariumController.updateTerrarium);

module.exports = router;