const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  otp: String,
  createdAt: Date,
  expiresAt: {
    type: Date,
    default: new Date(Date.now() + 60 * 1000)
  },
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
