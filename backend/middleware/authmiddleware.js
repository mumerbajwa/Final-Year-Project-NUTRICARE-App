// Authentication middleware 
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res) => {
  console.log("Hhhhhhhhhhhhhhhh")
  res.status(200).json({ message: 'Token is not valid' });
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
