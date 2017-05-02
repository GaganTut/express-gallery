/*jshint esversion: 6*/
const express = require('express');
const galleryFunctions = require('./routeFunctions/galleryFunctions');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    galleryFunctions.renderFullGallery(req, res);
  })
  .post((req, res) => {
    galleryFunctions.addNewToGallery(req, res);
  });

router.route('/new')
  .get((req, res) => {
    galleryFunctions.renderNewForm(req, res);
  });

router.get('/:id/edit', (req, res) => {
  galleryFunctions.renderEditForm(req, res);
});

router.route('/:id')
  .get((req, res) => {
    galleryFunctions.renderSinglePhoto(req, res);
  })
  .put((req,res) => {
    galleryFunctions.editPhoto(req, res);
  })
  .delete((req, res) => {
    galleryFunctions.destroyPhoto(req, res);
  });

module.exports = router;