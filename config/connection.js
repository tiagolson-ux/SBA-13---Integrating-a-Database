// Note to self: This file handles the connection to MongoDB using Mongoose. It logs success or errors.

const mongoose = require('mongoose'); // Note to self: Import Mongoose for MongoDB interaction

const connectDB = async () => { // Note to self: Define an async function to connect to the database
  try {
    // Note to self: Attempt to connect using the MONGO_URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Note to self: Use new URL parser
      useUnifiedTopology: true, // Note to self: Use unified topology
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); // Note to self: Log successful connection with host
  } catch (error) {
    console.error(`Error: ${error.message}`); // Note to self: Log any connection errors
    process.exit(1); // Note to self: Exit the process if connection fails
  }
};

module.exports = connectDB; // Note to self: Export the connectDB function for use in server.js