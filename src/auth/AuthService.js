const fs = require('fs').promises;
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'your_secret_key'; // Replace with a strong secret key
const USER_DATA_FILE = 'users.json'; // JSON file to store user data

class AuthService {
  constructor() {
    this.users = [];
    this.init(); // Initialize user data on creation
  }

  async init() {
    try {
      const data = await fs.readFile(USER_DATA_FILE, 'utf-8');
      this.users = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File does not exist, initialize with an empty array
        this.users = [];
      } else {
        console.error('Error reading user data:', error.message);
      }
    }
  }

  async saveUsers() {
    try {
      await fs.writeFile(USER_DATA_FILE, JSON.stringify(this.users, null, 2), 'utf-8');
      console.log('Users saved successfully.'); // Add debug log
    } catch (error) {
      console.error('Error saving user data:', error.message);
      throw error; // Ensure errors are propagated
    }
  }
  

  async register(username, email, password, role= 'user') {
    try {
      // Ensure users are loaded before adding a new user
      if (this.users.length === 0) {
        await this.init();
      }

      const id = Date.now().toString();
      const passwordHash = await hashPassword(password);
      const newUser = new User(id, username, email, passwordHash);
      this.users.push(newUser);
      await this.saveUsers();
      return newUser;
    } catch (error) {
      console.error('Error registering user:', error.message);
      throw error;
    }
  }

  async login(username, password) {
    // Ensure users are loaded before attempting login
    if (this.users.length === 0) {
      await this.init();
    }

    const user = this.users.find(user => user.username === username);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
    return { user, token };
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = new AuthService();
