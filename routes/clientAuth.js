const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../middleware/clientAuth')
const { check, validationResult } = require('express-validator');
const Client = require('../models/Client');



// @route   GET api/clientAuth
// @desk    Get logged in as client and view your details
// access   Private
router.get('/', 
        auth, 
            async (req, res) => {
    try {
        const client = await Client.findById(req.client.id).select('-password');
        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    });

// @route   POST api/clientAuth
// @desk    Auth user and get token
// access   Public
router.post(
    '/', 
    [
    check('regNo', 'Please enter a valid reg no').exists(),
    check('password', 'Password is required').exists()
    ], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { regNo, password } = req.body;

    try {
        let client = await Client.findOne( { regNo });

        if(!client) {
            return res.status(400).json( { msg: 'Invalid reg no or password'});
        }
        const isMatch = await bcrypt.compare(password, client.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Reg No or Password'})
        };

        const payload = {
            client: {
                id: client.id
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