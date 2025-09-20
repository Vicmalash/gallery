const mongoose = require('mongoose');
const { Schema } = mongoose; // ✅ destructure Schema from mongoose

const imageSchema = new Schema({
  name: String,
  path: String,
  size: Number,
});

module.exports = mongoose.model('Image', imageSchema);
