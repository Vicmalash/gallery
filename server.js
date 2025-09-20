// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Routes
const index = require('./routes/index');
const image = require('./routes/image');

const app = express();

// View engine
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

// Only connect to MongoDB if NOT in test environment
if (process.env.NODE_ENV !== 'test') {
  const MONGO_URI = process.env.MONGODB_URI || require('./config').MONGO_URI;

  if (!MONGO_URI) {
    console.error("❌ MongoDB URI is not set. Exiting...");
    process.exit(1);
  }

  const connectWithRetry = () => {
    mongoose.connect(MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => {
      console.error("❌ MongoDB connection error:", err);
      console.log("⏳ Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
  };

  connectWithRetry();
}

// Start server only if NOT in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
  });
}

module.exports = app; // Export app for testing
