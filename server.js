// Note to self: This is the main entry point of the application. It sets up the Express server, connects to the database, and starts listening on the specified port.

require('dotenv').config(); // Note to self: Load environment variables from .env file
const express = require('express'); // Note to self: Import Express framework for building the API
const connectDB = require('./config/connection'); // Note to self: Import the database connection function

const app = express(); // Note to self: Create an Express application instance

// Note to self: Middleware to parse JSON bodies in requests
app.use(express.json());

// Note to self: double check tester--- Connect to MongoDB
connectDB();

// Note to self: Import and use the product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Note to self: Define the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Note to self: Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Note to self: Log when the server starts successfully
});