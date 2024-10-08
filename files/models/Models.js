const mongoose = require("mongoose");

const ModelsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  brandId: { type: String, required: true },
  name: { type: String, required: true },
});

const Models = mongoose.model("Models", ModelsSchema);

module.exports = Models;
