const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  id: {
    type: String, // UUID will be a string
    required: true,
    unique: true, // Ensure the ID is unique
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

// Export the Product model
module.exports = mongoose.model("Product", productSchema);
