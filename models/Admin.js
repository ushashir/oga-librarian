const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema ({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    branch: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    position: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    email: {
        type: String,
    },
    
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('admin', AdminSchema);

