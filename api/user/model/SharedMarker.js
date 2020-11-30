const mongoose = require("mongoose");
const sharedMarkerSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please Include an ID "]
  },
  username: {
      type: String,
      required: [true, "Please Include a username"]
  }
});


const SharedMarker = mongoose.model("SharedMarker", sharedMarkerSchema);
module.exports = SharedMarker;