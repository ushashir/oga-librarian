const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema ({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inquiries'
    },
    regNo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        default: 'OTHERS'
    },
    firstName: {
        type: String,
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
    },
    homeAddress: {
        type: String,
    },
    officeAddress: {
        type: String,
    },
    gender: {
        type: String,
    },
    occupation: {
        type: String,
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
    subStatus: {
        type: String,
        default: 'OFF'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('clients', ClientSchema);