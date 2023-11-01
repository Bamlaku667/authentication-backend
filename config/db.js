const mongoose = require("mongoose");

const connectToDB = () => {
  const dbURI = process.env.dbURI;
  return mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
    

module.exports = connectToDB;