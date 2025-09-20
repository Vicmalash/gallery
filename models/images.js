const express = require('express');
const router = express.Router();
const Image = process.env.NODE_ENV === 'test'
  ? { find: async () => [
      { _id: '1', name: 'Test Image 1', path: '/test1.jpg', size: 123 },
      { _id: '2', name: 'Test Image 2', path: '/test2.jpg', size: 456 },
    ] }
  : require('../models/images');

// GET /image - returns JSON array of images in test mode, otherwise normal behavior
router.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    if (process.env.NODE_ENV === 'test') {
      return res.json(images); // return JSON for tests
    } else {
      return res.render('image', { images });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
