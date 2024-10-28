const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    console.error('sign up error:', err);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    console.error('login error:', err);
  }
});

// Admin sign-up route
router.post('/admin/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Admin already exists' });

    user = new User({ name, email, password, role: 'admin' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Admin sign-up error:', err);
  }
});

module.exports = router;
