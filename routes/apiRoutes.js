const express = require("express");
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth')

const {
  createNewUser,
  authenticateUser,
} = require("../controllers/userController");
const generateToken = require("../utils/generateToken");
const router = express.Router();


router.get('/private_data', auth ,  (req, res) => {
  res.status(200).send(`accessing private data of ${req.user.email}`);
})

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!(trimmedEmail && trimmedPassword)) {
      throw new Error("Empty credentials supplied");
    }

    // Authenticate the user here and obtain the user's unique identifier (e.g., _id)
    const user = await authenticateUser(trimmedEmail, trimmedPassword);

    if (!user) {
      throw new Error("Authentication failed");
    }

    // Generate a JWT token with user._id and user.email in the payload
    const tokenData = {userId: user._id, email: user.email}
    const token = await generateToken(tokenData);
    user.token = token;
    res.status(200).json({ user});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/private_data', auth ,  (req, res) => {
  res.status(200).send(`accessing private data of ${req.user.email}`);
})

router.post("/signup", async (req, res) => {
  try {
    var { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if (!(name && email && password)) {
      throw Error("Empty input fields");
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      throw Error("invalid name entered");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("invalid email");
    } else if (password.length < 8) {
      throw Error("password is too short");
    } else {
      const newUser = await createNewUser({
        name,
        email,
        password,
      });

      if (newUser.error) {
        res.status(newUser.status).json({ error: newUser.error });
      } else {
        res.status(200).json(newUser);
      }
    }
  } catch (err) {
    throw err;
  }
});

module.exports = router;
