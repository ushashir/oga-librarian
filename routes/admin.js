const express = require('express');
const router = express.Router();

const admin = require('../models/Admin')

// @route   GET api/clients
// @desk    Get all clients details
// access   Private
router.get('/', (req, res) => {
    res.send('Get all users details');
});

// @route   POST api/clients
// @desk    register new client
// access   Private
router.post(
    '/',
      [ auth,
        [
            check('reg no', 'Please add reg no').not().isEmpty(),
            check('password', 'Please enter a password with four or more characters').isLength({ min: 4 })
        ] 
    ], 
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      
      const  { 
                regNo,
                password,
                category, 
                firstName, 
                lastName, 
                phoneNo, 
                email,
                homeAddress,
                officeAddress,
                gender,
                occupation,
                institution,
                department,
                schoolID,
                level,
                subStatus
                            } = req.body;
  
          let admin = await Admi
      try {n.findOne( { userName });
  
          if (admin) {
              return res.status(400).json({ msg: 'Registration rejected. contact 08165593275'})
          }
          
          admin = new Admin({
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