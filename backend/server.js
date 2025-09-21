const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database');
const cardsRouter = require('./routes/cards');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/cards', cardsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to CardKey Management System API',
    version: '1.0.0'
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  db.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
      process.exit(1);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
