const jwt = require('jsonwebtoken');
require('dotenv').config();
const {TOKEN_KEY, TOKEN_EXPIRY} = process.env
const generateToken =  async (data) =>  {
    try {
    const token = jwt.sign(data, TOKEN_KEY , {expiresIn: TOKEN_EXPIRY})
    return token 
    }
    catch(error) {
        throw error;
    }
}

module.exports = generateToken;