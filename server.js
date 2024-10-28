const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const corsConfig = require('./middleware/corsConfig'); // Import CORS
const adminRoutes = require('./routes/admin');
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(corsConfig);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
