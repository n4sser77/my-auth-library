const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Make sure this matches the secret key used in AuthService

function authenticateToken(req, res, next) {
    console.log('Received request to /api/protected');
  const authHeader = req.headers['authorization'];
    console.log('Raw auth Header:' + authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted Token:' + token)
  //console.log(authHeader);


  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.sendStatus(403); // Forbidden
  }
}

module.exports = authenticateToken; // Export the function directly
