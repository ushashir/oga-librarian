const mongoose = require('mongoose');

const AskLibrarianSchema = mongoose.Schema ({
    
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
    email: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    question: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('ask-librarian', AskLibrarianSchema);

