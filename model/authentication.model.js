const mongoose = require("mongoose");

const AuthenticationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    confirmPassword: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Authentication = mongoose.model("aunthentication", AuthenticationSchema);

module.exports = Authentication;
 