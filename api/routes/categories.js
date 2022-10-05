const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(404).type('txt').send('Not found');
  }
});

router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(404).type('txt').send('Not found');
    }
  });

module.exports = router;
