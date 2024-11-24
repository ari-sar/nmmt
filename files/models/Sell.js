const mongoose = require("mongoose");

const SellSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  price: { type: Number, required: true },
  modelName: { type: String },
  modelId: { type: String },
  productId: { type: String },
  subProductId: { type: String },
  brandId: { type: String },
  qty: { type: Number },
  date: { type: Date },
  userName: { type: String, default: "" },
});

const Sells = mongoose.model("Sells", SellSchema);

module.exports = Sells;
