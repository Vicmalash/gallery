const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url');
let Image = require('../models/images');

var db = [];

// GET home page
router.get('/', async (req, res) => {
    try {
        const images = await Image.find({});
        res.render('index', { images: images, msg: req.query.msg });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// POST upload
router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`);
        } else {
            if (!req.file) {
                res.redirect('/?msg=Error: No file selected!');
            } else {
                try {
                    const newImage = new Image({
                        name: req.file.filename,
                        size: req.file.size,
                        path: 'images/' + req.file.filename
                    });

                    await newImage.save();
                    res.redirect('/?msg=File uploaded successfully');
                } catch (err) {
                    console.error(err);
                    res.redirect('/?msg=Error saving file to database');
                }
            }
        }
    });
});

module.exports = router;
