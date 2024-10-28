const cors = require('cors');

const corsConfig = cors({
  origin: 'http://localhost:3000', // Replace with frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

module.exports = corsConfig;