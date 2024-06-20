const express = require('express');
const router = express.Router();
const { initiatePayment, verifyPaymentStatus } = require('../controllers/paymentController');


router.post('/initiate', initiatePayment);
router.post('/verify', verifyPaymentStatus);

module.exports = router;
