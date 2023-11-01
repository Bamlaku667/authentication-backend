const express = require("express");
const createNewUser = require("../controllers/userController");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
