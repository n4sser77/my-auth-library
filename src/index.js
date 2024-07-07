const express = require('express');
const AuthController = require('./auth/AuthController.js');
const authenticateToken = require('./auth/middlewere/authMiddlewere.js')
const session = require('express-session');
const path = require('path');
const cors = require('cors');
// Use CORS middleware


const app = express();
const PORT = 3000;
app.use(cors());
// Middleware
app.use(express.json());
app.use(session({
  secret: 'sessions-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use('/auth', AuthController);

// Protected route
app.get('/api/protected', authenticateToken , (req, res) => {
  res.status(200).json({ message: 'This is a protected route.', user: req.user });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
