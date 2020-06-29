const express =  require('express');
const connectDB = require('./config/db');

// api routes
const admin = require('./routes/adminReg');
const adminAuth = require('./routes/adminAuth');
const client = require('./routes/client');
const clientAuth = require('./routes/clientAuth');
// const receipt = require('./routes/receipts');
// const askLibrarian = require('./routes/askLibrarian');
// const booking = require('./routes/bookings');
// const inquiry = require('./routes/inquiries');

const app = express();

// connect db
connectDB();

//init middleware
app.use(express.json({extented: false}));

app.get('/', (req, res) => res.json ({ msg: 'Welcome to Oga librarian app'}));

// remote api's
app.use('/api/admins', admin);
app.use('/api/adminAuth', adminAuth);
app.use('/clients', client);
app.use('/api/clientAuth', clientAuth);
// app.use('/api/askLibrarian', askLibrarian);
// app.use('/api/bookings', booking);
// app.use('/api/receipts', receipt);
// app.use('/api/inquiries', inquiry);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));