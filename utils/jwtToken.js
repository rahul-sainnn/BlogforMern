const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'  // Example: token expires in 1 day
  });

  res.status(statusCode).json({
    success: true,
    token
  });
};

module.exports = sendToken;
