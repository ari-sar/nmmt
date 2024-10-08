const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Brands = mongoose.model("Brands", brandsSchema);
module.exports = Brands;
