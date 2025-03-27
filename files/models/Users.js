const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "User" },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
