const express = require('express');
const router = express.Router();
const auth = require('../middleware/adminAuth');
const { check, validationResult } = require('express-validator');

const Receipt = require('../models/Receipt')

// @route   GET api/receipts
// @desk    Get all users details
// access   Private
router.get('/', auth, async (req, res) => { 
    try {
        const receipts = await Receipt.find( {receipts: req.receipts}).sort( { date: -1 });
        res.json(receipts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   POST api/receipts
// @desk    Add new receipt
// access   Private
router.post(
    '/', 
    [ auth, 
        [
        check('name', 'Name is required').not().isEmpty(),
        check('amount', 'Amount is required').not().isEmpty()
    ] 
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const  { name, amount, paidFor } = req.body;

    try {
        const newReceipt = new Receipt ({
            name, 
            amount, 
            paidFor,
            admin: req.admin.id
        });

        const receipt = await newReceipt.save();

        res.json(receipt);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

// @route   PUT api/receipts/:id
// @desk    Update receipt
// access   Private
router.put('/:id', auth, async (req, res) => {
    const { name, amount, paidFor } = req.body;

    // Build a receipt object
    const receiptFields = {};
    if(name) receiptFields.name = name;
    if(amount) receiptFields.amount = amount;
    if(paidFor) receiptFields.paidFor = paidFor;
    
    try {
        let receipt = await Receipt.findById(req.params.id);
        
        if (!receipt) return res.status(404).json( { msg: 'Receipt not Found' });

        // Make sure admin own the receipt
        if (receipt.admin.toString() !== req.admin.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        receipt = await Receipt.findByIdAndUpdate(req.params.id,
            { $set: receiptFields },
            { new: true });

            res.json(receipt);
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }

});
// @route   DELETE api/recipts/:id
// @desk    Delete receipts
// access   Private
router.delete('/:id', auth, async (req, res) => {
    res.send('Delete Receipt');

    try {
        let receipt = await Receipt.findById(req.params.id);
        
        if (!receipt) return res.status(404).json( { msg: 'Receipt not Found' });

        // Make sure user own the receipt
        if (receipt.admin.toString() !== req.admin.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        await Receipt.findByIdAndRemove(req.params.id);

            res.json({ msg: 'Receipt removed' });
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;