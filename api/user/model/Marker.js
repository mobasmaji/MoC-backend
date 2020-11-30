const mongoose = require("mongoose");
const markerSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please Include an ID "]
  },
  name: {
    type: String,
    required: [true, "Please Include a name"]
  },
  username: {
      type: String,
      required: [true, "Please Include a username"]
  },
  lat: {
    type: Number,
    required: [true, "Please Include a latitude"]
  },
  lng: {
    type: Number,
    required: [true, "Please Include a longitude"]
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: [true, "Please Include a type"]
  }
});


const Marker = mongoose.model("Marker", markerSchema);
module.exports = Marker;