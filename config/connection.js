// Note to self: This file handles the connection to MongoDB using Mongoose. It logs success or errors.

const mongoose = require('mongoose'); // Notes -ok Tia: Import Mongoose for MongoDB interaction

const connectDB = async () => { // Note Tia For understanding remember: Define an async function to connect to the database
  try {
    // Note ok TT: Attempt to connect using the MONGO_URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Notes T Notes: Use new URL parser
      useUnifiedTopology: true, // Notes for me: Use unified topology
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); // Note to self: Log successful connection with host
  } catch (error) {
    console.error(`Error: ${error.message}`); // Note to self: Log any connection errors
    process.exit(1); // Note- Tia ok remember o exit: Exit the process if connection fails
  }
};

module.exports = connectDB; // Note- dont forget to : Export the connectDB function for use in server.js