const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

// ✅ MongoDB connection
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error("❌ MONGODB_URI not set. Exiting...");
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

// Initializing the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
