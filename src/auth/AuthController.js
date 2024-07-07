const express = require('express');
const AuthService = require('./AuthService');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await AuthService.register(username, email, password);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await AuthService.login(username, password);
    res.status(200).json({ user, token });
    console.log(`User logged in succesfully user: ${user.username} , token: ${token} `)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
