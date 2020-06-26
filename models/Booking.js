const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema ({
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    organisation: {
        type: String,
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    event: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('bookings', BookingSchema);

