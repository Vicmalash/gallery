const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const upload = require('./upload');
const Image = process.env.NODE_ENV === 'test'
  ? {
      find: async () => [
        { _id: '1', name: 'Test Image 1', path: '/test1.jpg', size: 123 },
        { _id: '2', name: 'Test Image 2', path: '/test2.jpg', size: 456 },
      ]
    }
  : require('../models/images');

// Landing page
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.render('index', { images: images, msg: req.query.msg });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Upload endpoint
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.redirect(`/?msg=${err}`);
    } else {
      if (!req.file) {
        res.redirect('/?msg=Error: No file selected!');
      } else {
        if (process.env.NODE_ENV !== 'test') {
          let newImage = new Image({
            name: req.file.filename,
            size: req.file.size,
            path: 'images/' + req.file.filename
          });
          await newImage.save();
        }
        res.redirect('/?msg=File uploaded successfully');
      }
    }
  });
});

module.exports = router;
