const Marker = require("../model/Marker");
const SharedMarker = require("../model/SharedMarker");

// exporting functions to be used somewhere else (routing in user.js)
exports.addMarker = async (req, res) => {
  try {
    let newMarker = await Marker.find({ id: req.body.id });
    if (newMarker.length >= 1) {
      return res.status(400).json({
        message: "id already in use"
      });
    }
    if (!req.body.id || !req.body.name || !req.body.username || 
        !req.body.lat || !req.body.lng || !req.body.type || 
        !req.body.share) {
      return res.status(400).json({
        message: "An argument is missing"
      });
    }
    const marker = new Marker({
      id: req.body.id,
      name: req.body.name,
      username: req.body.username,
      lat: req.body.lat,
      lng: req.body.lng,
      description: req.body.description ? req.body.description : "",
      type: req.body.type

    });
    let data = await marker.save();
    if (req.body.share) {
      const sharedMarker = new SharedMarker({
        id: req.body.id,
        username: req.body.username
      });
      await sharedMarker.save();

    }
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.deleteMarker = async (req, res) => {
  try {
    let status1 = await Marker.remove({ id: req.body.id });
    let status2 = await SharedMarker.remove({ id: req.body.id });
    res.status(201).json({
      status: "success",
      data: [status1, status2]
    })
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.getAll = async (req, res) => {
  try {
    let markers = await Marker.find({ username: req.body.username });
    res.status(201).json({
      status: "success",
      data: markers
    })
  } catch (err) {
    res.status(400).json({ err: err });
  }

};

exports.getMarker = async (req, res) => {
  try {
    let markers = await Marker.find({ username: req.body.username, id: req.body.id });
    res.status(201).json({
      status: "success",
      data: markers
    })
  } catch (err) {
    res.status(400).json({ err: err });
  }

};
exports.updateMarker = async (req, res) => {
  try {
    let markers = await Marker.update({ id: req.body.id },
      {
        name: req.body.name,
        username: req.body.username,
        lat: req.body.lat,
        lng: req.body.lng,
        description: req.body.description,
        type: req.body.type
      });
    res.status(201).json({
      status: "success",
      data: markers
    });
  } catch (err) {
    res.status(400).json({ err: err });
  }

};

exports.getShared = async (req, res) => {
  try {
    let ids = await SharedMarker.find({ username: req.body.username }, { id: 1, _id: 0 });
    let markers = [];
    for (const id of ids) {
      const sharedMarkers = await Marker.find({ id: id.id });
      for (const sharedMarker of sharedMarkers) {
        markers.push(sharedMarker);
      }
    }
    res.status(201).json({
      status: "success",
      data: markers
    })
  } catch (err) {
    res.status(400).json({ err: err });

  }
}