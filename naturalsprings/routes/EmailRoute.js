const emailController = require('../controllers/emailController');
const fileUpload = require('../middleware/fileUpload');
const { check } = require('express-validator');

const express = require('express');

const router = express.Router();

router.post('/sendEmail',
fileUpload.single('image'),
[
check('fullName').not().isEmpty(),
check('phoneNumber', "Enter valid phone number.").isLength({min:10,max:17}).isNumeric(),
check('message').not().isEmpty(),
check('email', "Enter valid email").isEmail()
], emailController.sendEmail);

module.exports = router;