
const initializePayment = async (amount, orderId) => {

  const transactionId = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'; 

  return { transactionId };
};


const verifyPayment = async (transactionId) => {

  const status = 'success'; 

  return { transactionId, status };
};

module.exports = {
  initializePayment,
  verifyPayment
};
