const express = require('express');
const router = express.Router();
const upload = require('./upload');

// Use mock Image in test mode
const Image = process.env.NODE_ENV === 'test'
  ? {
      find: async () => [
        { _id: '1', name: 'Test Image 1', path: '/test1.jpg', size: 123 },
        { _id: '2', name: 'Test Image 2', path: '/test2.jpg', size: 456 },
      ],
      prototype: { save: async () => {} }
    }
  : require('../models/images');

router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.render('index', { images, msg: req.query.msg });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.redirect(`/?msg=${err}`);
    if (!req.file) return res.redirect('/?msg=Error: No file selected!');

    try {
      const newImage = new Image({
        name: req.file.filename,
        size: req.file.size,
        path: 'images/' + req.file.filename,
      });
      await newImage.save();
      res.redirect('/?msg=File uploaded successfully');
    } catch (err) {
      console.error(err);
      res.redirect('/?msg=Error saving file!');
    }
  });
});

module.exports = router;
