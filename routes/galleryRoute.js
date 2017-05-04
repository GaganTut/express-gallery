/*jshint esversion: 6*/
const express = require('express');
const galleryFunctions = require('./routeFunctions/galleryFunctions');
const helper = require('./routeFunctions/helperFunctions');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    galleryFunctions.renderFullGallery(req, res);
  })
  .post(helper.checkAuth, (req, res) => {
    galleryFunctions.addNewToGallery(req, res);
  });

router.route('/new')
  .get(helper.checkAuth,(req, res) => {
    galleryFunctions.renderNewForm(req, res);
  });

router.get('/:id/edit', (req, res) => {
  galleryFunctions.renderEditForm(req, res);
});

router.route('/:id')
  .get((req, res) => {
    galleryFunctions.renderSinglePhoto(req, res);
  })
  .put(helper.checkAuth, (req,res) => {
    galleryFunctions.editPhoto(req, res);
  })
  .delete(helper.checkAuth, (req, res) => {
    galleryFunctions.destroyPhoto(req, res);
  });

module.exports = router;