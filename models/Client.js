const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema ({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients'
    },
    regNo: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: Number,
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
        default: ''
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

module.exports = mongoose.model('client', ClientSchema);