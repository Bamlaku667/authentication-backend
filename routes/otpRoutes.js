const express = require("express");
const router = express.Router();
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const { hashData, verifyData } = require("../utils/hashData");
const OTP = require("../model/otp");
require("dotenv").config();
const { AUTH_EMAIL, AUTH_PASS } = process.env;

router.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const trimmedEmail = email.trim();
    const trimmedOtp = otp.trim();
    if (!(trimmedEmail && trimmedOtp)) {
      return res.status(400).json({ message: "Provide a value for email and otp" });
    }

    const matchedOTPRecord = await OTP.findOne({ email: email });

    if (!matchedOTPRecord) {
      return res.status(404).json({ message: "No OTP for this email" });
    }

    const { expiresAt } = matchedOTPRecord;

    if (expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired. Request a new one." });
    }

    const hashedOTP = matchedOTPRecord.otp;

    const otpMatch = await verifyData(hashedOTP, otp);

    return res.status(200).json({ validOtp: otpMatch });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return res.status(400).json({ message: "Empty email provided" });
    }

    // Generate OTP
    const otp = await generateOTP();

    // Send email
    const mailOptions = {
      from: AUTH_EMAIL,
      to: trimmedEmail,
      subject: "Your OTP password",
      text: `Your OTP is ${otp}`,
    };

    // Send email
    await sendEmail(mailOptions);

    // Delete previous OTPs for the same email
    await OTP.deleteMany({ email: trimmedEmail });

    const hashedOTP = await hashData(otp);
    // Save OTP
    const newOTP = new OTP({
      email: email,
      otp: hashedOTP,
      createdAt: Date.now(),
    });

    await newOTP.save();

    return res.status(200).json({ message: "OTP sent and saved successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
    