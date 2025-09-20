const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Routes
const index = require('./routes/index');
const image = require('./routes/image');

// ✅ MongoDB connection
// Use environment variable if available, otherwise fallback to config.js
const MONGO_URI = process.env.MONGODB_URI || require('./config').MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MongoDB URI is not set. Exiting...");
    process.exit(1);
}

mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("✅ Database connected successfully"))
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});

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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
