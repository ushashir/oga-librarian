const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { check, validationResult } = require('express-validator');
const Booking = require('../models/Booking');

// @route   get api/bookings
// @desc    get all bookings
// access   private - admin only
router.get('/', adminAuth, async (req, res) => { 
    try {
        const bookings = await Booking.find( {bookings: req.bookings}).sort( { date: -1 });
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/bookings
// @desc    Post an booking
// access   Public
router.post(
    '/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('phoneNo', 'Phone number is required').not().isEmpty(),
        check('email', 'Enter a valid email address').isEmail(),
        check('eventTitle', 'Event title is required').not().isEmpty(),
        check('eventDate', 'Event date is required').not().isEmpty()
    ], 
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const  { name, email, phoneNo, organisation, eventTitle, eventDate, discription } = req.body;

    try {
        const newBooking = new Booking ({
            name, 
            email, 
            phoneNo, 
            organisation, 
            eventTitle, 
            eventDate, 
            discription
        });

        const booking = await newBooking.save();

        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;