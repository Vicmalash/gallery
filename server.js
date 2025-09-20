// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Routes
const index = require('./routes/index');
const image = require('./routes/image');

// ✅ MongoDB connection using victest
// Use environment variable if available, otherwise fallback to config.js
let MONGO_URI;
try {
  MONGO_URI = process.env.MONGODB_URI || require('./config').MONGO_URI;
} catch (err) {
  // Config file missing, rely on env variable
  MONGO_URI = process.env.MONGODB_URI;
}

// Only try to connect if MONGO_URI is set (skip for Jest tests if mocked)
if (MONGO_URI) {
  const connectWithRetry = () => {
    mongoose.connect(MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        console.log("⏳ Retrying in 5 seconds...");
        setTimeout(connectWithRetry, 5000); // retry every 5 seconds
    });
  };
  connectWithRetry();
} else if (process.env.NODE_ENV !== 'test') {
  console.error("❌ MongoDB URI is not set. Exiting...");
  process.exit(1);
}

// Initialize app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

// Export app for testing
module.exports = app;

// Start server only if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
      console.log(`🚀 Server is listening at http://localhost:${PORT}`);
  });
}
