const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Admin = require('../models/Admin');

// @route   POST api/admins
// @desc    Register an admin
// access   public



module.exports = router;