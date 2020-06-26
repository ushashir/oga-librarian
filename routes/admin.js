const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desk    Get all users details
// access   Private
router.get('/', (req, res) => {
    res.send('Get all users details');
});

// @route   POST api/users
// @desk    Add new user
// access   Private
router.post('/', (req, res) => {
    res.send('Add user');
});

// @route   PUT api/user/:id
// @desk    Update user
// access   Private
router.put('/', (req, res) => {
    res.send('Update Book');
});

// @route   DELETE api/user/:id
// @desk    Delete user
// access   Private
router.delete('/', (req, res) => {
    res.send('Delete Book');
});

module.exports = router;