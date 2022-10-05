const mongoose = require("mongoose");

//create a schema for the category
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//export schema
module.exports = mongoose.model("Category", CategorySchema);
