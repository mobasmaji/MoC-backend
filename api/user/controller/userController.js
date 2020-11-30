const User = require("../model/User");
// exporting functions to be used somewhere else (routing in user.js)
exports.registerNewUser = async (req, res) => {
    try {
        let newUser = await User.find({username: req.body.usenrame});
         if (newUser.length >= 1) {
           return res.status(409).json({
             message: "Username already in use"
           });
         }
         
         const user = new User({
           username: req.body.name,
           password: req.body.password
          });
         let data = await user.save();
         const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
         res.status(201).json({ data, token });
       } catch (err) {
         res.status(400).json({ err: err });
       }
};
exports.loginUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findByCredentials(username, password);
        if (!user) {
          return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
      } catch (err) {
        res.status(400).json({ err: err });
      }
};
exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};