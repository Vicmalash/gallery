const mongoose = require('mongoose');
const { Schema } = mongoose;

// ✅ Define the Mongoose schema
const imageSchema = new Schema({
  name: String,
  path: String,
  size: Number,
});

// ✅ Export the Mongoose model
module.exports = mongoose.model('Image', imageSchema);
