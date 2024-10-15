const mongoose = require("mongoose");

const PricesSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  average: { type: Number, default: 0 },
  good: { type: Number, default: 0 },
  best: { type: Number, default: 0 },
  hasWarranty: { type: Boolean, default: false },
  warrantyTenure: { type: String },
  brandId: { type: String },
  productId: { type: String },
  subProductId: { type: String },
  modelId: { type: mongoose.Schema.Types.ObjectId, ref: "Models" },
  isActive: { type: Boolean, default: true },
});

const Prices = mongoose.model("Prices", PricesSchema);

module.exports = Prices;
