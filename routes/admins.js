const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Admin = require('../models/Admin');

// @route   POST api/admins
// @desc    Register an admin
// access   public

router.post('/',  [
  check('userName', 'Please add admin name').not().isEmpty(),
  check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const  { userName, password, branch, firstName, lastName, position, phoneNo, email} = req.body;

    try {
        let admin = await Admin.findOne( { userName });

        if (admin) {
            return res.status(400).json({ msg: 'Registration rejected: Admin already exist'})
        }
        
        admin = new Admin ({
            userName,
            password,
            branch,
            firstName,
            lastName,
            position,
            phoneNo,
            email
        });

        const salt = await bcrypt.genSalt(10);

        admin.password = await bcrypt.hash(password, salt);

        await admin.save();

        
        const payload = {
            admin: {
                id: admin.id
            } 
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')  
    }
   }
  );

module.exports = router;