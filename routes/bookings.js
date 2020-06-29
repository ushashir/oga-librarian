const express = require('express');
const router = express.Router();

// @route   POST api/visitors
// @desc    Enquiries
// access   Public
router.post('/', (req, res) => {
    res.send('Post enquiry');
});

// @route   POST api/visitors
// @desc    Book a hall
// access   Public
router.post('/', (req, res) => {
    res.send('book for hall');
});

// @route   Put api/visitors
// @desc    Book a hall
// access   Public
router.put('/', (req, res) => {
    res.send('Edit booking details');
});

// @route   POST api/visitors
// @desc    Register a user
// access   Public
router.post('/', (req, res) => {
    res.send('Register a user');
});

// @route   POST api/visitors
// @desc    Ask the librarian
// access   Public
router.post('/', (req, res) => {
    res.send('Talk to librarian');
});

module.exports = router;