
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.createSendToken = (user, statusCode, res) => {
  const token = this.generateToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};

exports.generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash token for storage in DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  // Token expires in 10 minutes
  const resetExpires = Date.now() + 10 * 60 * 1000;
  
  return { resetToken, hashedToken, resetExpires };
};
