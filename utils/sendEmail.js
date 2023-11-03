const nodemailer = require("nodemailer");
require('dotenv').config();
const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.outlook.com",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("ready for message");
    console.log(success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error sending email ", err);
        res.status(500).json({ error: "error sending email" });
      } else {
        console.log("Email successfully sent ", info.response);
        res.status(500).json({ message: "OTP sent to your email" });
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
