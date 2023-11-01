const User = require("../model/user");
const hashData = require("../utils/hashData");
const createNewUser = async (data) => {
  try {
    const { name, email, password } = data;
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return {
        error: "User with this email already exists.",
        status: 400, // You can use 409 (Conflict) status code if you prefer
      };
    }
    // hashpassword
    hashedPassword = await hashData(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();

    return createdUser;
  } catch (err) {
    throw err;
  }
};

module.exports = createNewUser;
