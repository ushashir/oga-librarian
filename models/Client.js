const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients'
    },
    regNo: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        default: ''
    },
    occupation: {
        type: String,
    },
    student: {
        type: String,
        default: 'No'
    },
    institution: {
        type: String,
    },
    department: {
        type: String,
    },
    schoolID: {
        type: String,
    },
    level: {
        type: String,
    },
    subscriptionStatus: {
        type: String,
        default: 'OFF'
    },
    regAs: {
        type: String,
        default: 'OTHERS'
    }, 
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('client', ClientSchema);