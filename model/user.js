const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String, 

    required: true,
  }, 
  email: {
    type: String,

  },
  password: {
    type: String, 
    trim: true
  },
  token: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
