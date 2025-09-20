const express = require('express');
const router = express.Router();

const Image = process.env.NODE_ENV === 'test'
  ? {
      find: async () => [
        { _id: '1', name: 'Test Image 1', path: '/test1.jpg', size: 123 },
        { _id: '2', name: 'Test Image 2', path: '/test2.jpg', size: 456 },
      ]
    }
  : require('../models/images');

// Return all images as JSON
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
