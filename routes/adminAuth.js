const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/adminAuth')
const { check, validationResult } = require('express-validator');

const Admin = require('../models/Admin');

// @route   GET api/adminAuth
// @desk    Get logged in admin with username and view all clients
// access   Private
router.get('/', 
        auth, 
            async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    });

// @route   POST api/adminAuth
// @desk    Auth admin and get token
// access   Public
router.post(
    '/', 
    [
    check('userName', 'Please enter a valid user name').exists(),
    check('password', 'Password is required').exists()
    ], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userName, password } = req.body;

    try {
        let admin = await Admin.findOne( { userName });

        if(!admin) {
            return res.status(400).json( { msg: 'Invalid user name or Password'});
        }
        const isMatch = await bcrypt.compare(password, admin.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid user name or Password'})
        };

        const payload = {
            admin: {
                id: admin.id
            } 
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);


module.exports = router;