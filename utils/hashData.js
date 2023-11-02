const bcrypt = require("bcrypt");

const hashData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (err) {
    throw err;
  }
};

const verifyData = async (hashedData, unHashedData) => {
  try {
    const match = await bcrypt.compare(unHashedData, hashedData);
    return match;
  } catch (err) {
    throw err;
  }
};

module.exports = { hashData, verifyData };
