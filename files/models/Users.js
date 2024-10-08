const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  showPricing: { type: Boolean, default: true },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
