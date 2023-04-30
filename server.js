import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Require the routes for each model
import { publicRouter, privateRouter } from './routes/user.routes.js';


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Create Express app instance
const app = express();

// Set the port to listen on
const port = process.env.PORT || 3000;

// Set up middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
// Use the public routes
app.use('/api', publicRouter);

// Use the private routes
app.use('/api', privateRouter);



// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
