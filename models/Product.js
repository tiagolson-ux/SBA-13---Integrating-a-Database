// I so need these Notes: This file defines the Mongoose schema for the Product model, including all required fields and validations.

const mongoose = require('mongoose'); // Note to self T: Import Mongoose to define the schema

const productSchema = new mongoose.Schema({ // Note Tia: Create a new schema for products
  name: {
    type: String, // Note to T: Name is a string
    required: true, // Note to self: Name is required
  },
  description: {
    type: String, // Note: Description is a string
    required: true, // Note : Description is required
  },
  price: {
    type: Number, // Note to Tia: Price is a number
    required: true, // Note to T: Price is required
    min: 0.01, // Note to  me: Price must be greater than 0
  },
  category: {
    type: String, // Noting every step is alot but I know I will need this: Category is a string
    required: true, // Note: Category is required
  },
  inStock: {
    type: Boolean, // Note: InStock is a boolean
    default: true, // Note: Defaults to true
  },
  tags: [String], // Note: Tags is an array of strings
  createdAt: {
    type: Date, // Note: CreatedAt is a date
    default: Date.now, // Note to Tiaaaaaaasss: Defaults to current date and time
  },
});

const Product = mongoose.model('Product', productSchema); // Notes girl: Compile the schema into a model named 'Product'

module.exports = Product; // Note: Export the Product model