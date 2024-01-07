const mongoose = require("../common/configdb");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    unique: false,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    default: "Chưa xác định",
  },
  birthday: {
    type: Date,
    require: false,
  },
  accessToken: {
    type: String,
    required: false,
  },
  refreshToken: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "https://skin-food-store.onrender.com/images/avatar.png",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
