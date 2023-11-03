const generateOTP = async () => {
  try {
    const digits = 6;

    // Calculate the minimum and maximum values for the OTP.
    const min = Math.pow(10, digits - 1); // 100000
    const max = Math.pow(10, digits) - 1; // 999999

    // Generate a random number within the specified range (100000 to 999999).
    const otp = Math.floor(Math.random() * (max - min + 1) + min);

    // Format the OTP as a string with leading zeros if needed.
    return otp.toString().padStart(digits, "0");
  } catch (error) {
    throw error;
  }
};

module.exports = generateOTP;
