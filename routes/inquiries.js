const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { check, validationResult } = require('express-validator');
const Inquiry = require('../models/Inquiry');

// @route   get api/inquiries
// @desc    get all inquiries
// access   private - admin only
router.get('/', adminAuth, async (req, res) => { 
    try {
        const inquiries = await Inquiry.find( {inquiries: req.inquiries}).sort( { date: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/inquiries
// @desc    Post an inquiry
// access   Public
router.post(
    '/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('message', 'Message is required').not().isEmpty()
    ], 
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const  { name, email, message } = req.body;

    try {
        const newInquiry = new Inquiry ({
            name, 
            email, 
            message
        });

        const inquiry = await newInquiry.save();

        

        res.json(inquiry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});


module.exports = router;