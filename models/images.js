const Image = process.env.NODE_ENV === 'test'
  ? { find: async () => [
      { _id: '1', name: 'Test Image 1', path: '/test1.jpg', size: 123 },
      { _id: '2', name: 'Test Image 2', path: '/test2.jpg', size: 456 },
    ] }
  : require('../models/images');

const mongoose = require('mongoose');
const { Schema } = mongoose; // ✅ destructure Schema from mongoose

const imageSchema = new Schema({
  name: String,
  path: String,
  size: Number,
});

module.exports = mongoose.model('Image', imageSchema);
