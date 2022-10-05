const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) { // only the user of the account can update
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        { $set: req.body }, //the $set operator replaces the value of a field with the specified value
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(404).type('txt').send('Not found');
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE user
router.delete("/:id", async (req, res) => {
  if (req.params.id) { // only the user of the account can delete
    try {
      const user = await User.findById(req.params.id); //find user by id
      try {
        await Post.deleteMany({ username: user.username }); //delete post of the user
        await User.findByIdAndDelete(req.params.id); //delete user
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(404).type('txt').send('Not found');
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(404).type('txt').send('Not found');
  }
});

module.exports = router;
