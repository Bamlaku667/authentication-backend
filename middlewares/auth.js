const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKEN_KEY } = process.env;
const verifyToken = async (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(403).json({
      access: false,
      message: "auth token is required ",
    });
  }

  //   jwt.verify(token, TOKEN_KEY, (err, decoded) => {
  //     if (err) {
  //       return res.status(401).json({ message: 'Invalid token' });
  //     }

  //     // Token is valid, and decoded contains the payload
  //     req.user = decoded;
  //     next();
  //   });

  try {
    const decode = await jwt.verify(token, TOKEN_KEY);
    req.user = decode;
  } catch (err) {
    return res.status(400).send("invalid token ");
  }
  next();
};

module.exports = verifyToken;
