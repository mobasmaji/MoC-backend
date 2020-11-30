const express = require("express");
const markerRouter = express.Router();
const markerController = require("../controller/markerController");
const auth = require("../../../config/auth")

markerRouter.post("/add", markerController.addMarker);
markerRouter.post("/delete", auth, markerController.deleteMarker);
markerRouter.post("/getAll", markerController.getAll);
markerRouter.post("/getShared", markerController.getShared);
markerRouter.post("/get", markerController.getMarker);
markerRouter.post("/update", markerController.updateMarker);




module.exports = markerRouter;