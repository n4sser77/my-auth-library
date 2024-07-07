const jwt = require('jsonwebtoken');
const AuthService = requre('../AuthService');


// replace with strong key, 
// needs to be same as AuthService
const SECRET_KEY = '1234';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.sendStatus(403);
    }


}

module.exports = { authenticateToken };