const mongoose = require('mongoose');

const EnquirySchema = mongoose.Schema({
   
    firstName: {
        type: Number,
        required: true
    },
    lastName: {
        type: String,
    },
    phoneNo: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('inquiries', EnquirySchema);