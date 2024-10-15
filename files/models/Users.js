const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  showPricing: { type: Boolean, default: true },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
