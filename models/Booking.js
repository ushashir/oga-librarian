const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    organisation: {
        type: String,
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventDate: {
        type: String,
        required: true
    },
    discription: {
        type: String,
    }, 
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('bookings', BookingSchema);