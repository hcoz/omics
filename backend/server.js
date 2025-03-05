const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const geneExpressionRoutes = require('./routes/geneExpression');
const app = express();

// CORS configuration
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Server configurations
app.use(express.json());

// Routes
app.use('/api', geneExpressionRoutes);

// Database sync
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
