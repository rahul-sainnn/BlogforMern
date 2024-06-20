const Payment = require('../models/paymentModel');
const { initializePayment, verifyPayment } = require("../middleware/paymentService");


//initiatePayment<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const initiatePayment = async (req, res, next) => {
    const { amount, orderId } = req.body;

    try {
       
        const paymentInfo = await initializePayment(amount, orderId);

    
        const newPayment = new Payment({
            transactionId: paymentInfo.transactionId,
            amount,
          
        });

        await newPayment.save();

        res.status(200).json({ paymentInfo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//verifyPaymentStatus <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<payment >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const verifyPaymentStatus = async (req, res, next) => {
    const { transactionId, status } = req.body;

    try {
       
        const payment = await Payment.findOneAndUpdate(
            { transactionId },
            { status },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    initiatePayment,
    verifyPaymentStatus
};
