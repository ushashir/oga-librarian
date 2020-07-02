const mongoose = require('mongoose');

const ReceiptSchema = mongoose.Schema ({
    
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    paidFor: {
        type: String,
        default: "Library services"
    }
})

module.exports = mongoose.model('receipt', ReceiptSchema);

