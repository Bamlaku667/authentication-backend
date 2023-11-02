const User = require("../model/user");
const generateToken = require("../utils/generateToken");
const { hashData, verifyData } = require("../utils/hashData");
const bcrypt = require("bcrypt");

async function authenticateUser(email, password) {
  // Replace this with your actual user retrieval logic based on the provided email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // Compare the provided password with the hashed password from the user object
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Password incorrect");
  }

  return user;
}


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

module.exports = { createNewUser, authenticateUser };
