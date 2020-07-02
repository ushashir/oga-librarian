const mongoose = require('mongoose');

const EnquirySchema = mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inquiries'
    },
    name: {
        type: String,
        required: true
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