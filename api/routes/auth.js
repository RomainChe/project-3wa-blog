const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    // hash the password and use salt so that the hashing is different on same password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      admin: req.body.admin
    });

    //create user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
     res.status(404).type('txt').send('Username or email already used');
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //find the username in MongoDB
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username!");

    //find and validate the hashed password from mongoDb
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong password!");

    //remove the password on the body response JSON
    const { password, ...others } = user._doc; //_doc is a result that is obtained from the database
    res.status(200).json(others);
  } catch (err) {
    res.status(404).type('txt').send('Not found');
  }
});

module.exports = router;
