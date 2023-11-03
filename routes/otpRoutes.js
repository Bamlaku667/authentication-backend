const express = require('express');
const router = express.Router();
const generateOTP = require('../utils/generateOTP');
const sendEmail = require('../utils/sendEmail');
const { hashData } = require('../utils/hashData');
const OTP = require('../model/otp');
require('dotenv').config();
const {AUTH_EMAIL, AUTH_PASS} = process.env;

router.post('/', async (req, res) => {
    try {
        let {email} = req.body;
        
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            throw new Error('empty email provided');
        }

        //generate otp
        const otp = await generateOTP();


        // send email 
        const mailOptions = {
            from: AUTH_EMAIL,
            to: trimmedEmail,
            subject: 'your otp password ', 
            text: `your OTP is ${otp}`

        }

        // send email
        await sendEmail(mailOptions);

        // delete previous otps for same email
        await OTP.deleteMany({email: trimmedEmail});

        const hashedOTP = await hashData(otp)
        // save otp
        const newOTP = new OTP({
            email: email, 
            otp: hashedOTP, 
            createdAt: Date.now(),
        })

        await newOTP.save();

        res.status(200).json({message: 'otp sent and saved successfully'})
        
    } catch (error) {
        throw error
    }
})

module.exports = router;