const mongoose = require("mongoose");

// Define the Product schema
const subProductSchema = new mongoose.Schema({
  id: {
    type: String, // UUID will be a string
    required: true,
    unique: true, // Ensure the ID is unique
  },
  productId: {
    type: String, // UUID will be a string
    required: true,
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
module.exports = mongoose.model("SubProduct", subProductSchema);
