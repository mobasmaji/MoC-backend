const express = require("express");
const markerRouter = express.Router();
const markerController = require("../controller/markerController");
const auth = require("../../../config/auth")

markerRouter.post("/add",auth, markerController.addMarker);
markerRouter.post("/delete", auth, markerController.deleteMarker);
markerRouter.post("/getAll",auth, markerController.getAll);
markerRouter.post("/getShared", markerController.getShared);
markerRouter.post("/get",auth, markerController.getMarker);
markerRouter.post("/update",auth, markerController.updateMarker);




module.exports = markerRouter;