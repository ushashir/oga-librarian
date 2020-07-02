const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const clientAuth = require('../middleware/clientAuth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Admin = require('../models/Admin')
const Client = require('../models/Client')
const userName = require('../models/Admin')

// @route   GET api/clients
// @desk    admin gets all client details
// access   Private - only accessible to admin
router.get('/', adminAuth, async (req, res) => { 
    try {
        const clients = await Client.find( {clients: req.clients}).sort( { date: -1 });
        res.json(clients);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   GET api/clients/id?
// @desk    client dashboard view
// access   Private - only accessible to client
router.get('/:id', clientAuth, async (req, res) => { 
    try {
        const client = await Client.find( {client: req.client._id});
        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/clients
// @desk    register new client
// access   Private - only accessible to admin
router.post(
    '/',
      [ adminAuth,
        [
            check('regNo', 'Please add reg no').not().isEmpty(),
        ] 
    ], 
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      
      const { 
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
    try {
        let admin = await Admin.findOne( { userName });

        if (admin) {
            return res.status(400).json({ msg: 'Client already exist'})
        }
        const newClient = new Client({
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
          });

          const client = await newClient.save();

           const salt = await bcrypt.genSalt(10);
  
           client.password = await bcrypt.hash(password, salt);
  
         // await newClient.save();
          const payload = {
              client: {
                  id: client.id
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

// @route   PUT api/client/:id
// @desk    Update client
// access   Private - only accessible to admin
router.put('/:id', adminAuth, async (req, res) => {
    const { 
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

    // Build a contact object
    const clientFields = {};
    if(regNo) clientFields.regNo = regNo;
    if(password) clientFields.password = password;
    if(category) clientFields.category = category;
    if(firstName) clientFields.firstName = firstName;
    if(lastName) clientFields.lastName = lastName;
    if(phoneNo) clientFields.phoneNo = phoneNo;
    if(email) clientFields.email = email;
    if(homeAddress) clientFields.homeAddress = homeAddress;
    if(officeAddress) clientFields.officeAddress = officeAddress;
    if(gender) clientFields.gender = gender;
    if(occupation) clientFields.occupation = occupation;
    if(institution) clientFields.institution = institution;
    if(department) clientFields.department = department;
    if(schoolID) clientFields.schoolID = schoolID;
    if(level) clientFields.level = level;
    if(subStatus) clientFields.subStatus = subStatus; 
    
    try {
        let client = await Client.findById(req.params.id);
        
        if (!client) return res.status(404).json( { msg: 'Client not Found' });

        // Make sure admin own the client
        if (client.admin.toString() !== req.admin.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        client = await Client.findByIdAndUpdate(req.params.id,
            { $set: clientFields },
            { new: true });

            res.json(client);
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }

});


// @route   DELETE api/client/:id
// @desk    Delete client
// access   Private - only admin
router.delete('/:id', adminAuth, async (req, res) => {
    res.send('Delete Client');

    try {
        let client = await Client.findById(req.params.id);
        
        if (!client) return res.status(404).json( { msg: 'Client not Found' });

        // Make sure admin own the client
        if (client.admin.toString() !== req.admin.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        await Client.findByIdAndRemove(req.params.id);

            res.json({ msg: 'Client removed' });
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;