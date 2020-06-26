const mongoose = require('mongoose');

const ReceiptSchema = mongoose.Schema ({
    
    date: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    amountWords: {
        type: String,
    },
    amount: {
        type: String,
        required: true,
    },
    for: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('receipt', ReceiptSchema);

