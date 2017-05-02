/*jshint esversion: 6*/
const express = require('express');
const galleryFunctions = require('./routeFunctions/galleryFunctions');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    galleryFunctions.getFullGallery(req, res);
  })
  .post((req, res) => {
    galleryFunctions.artPost(req, res);
  });

router.route('/new')
  .get((req, res) => {
    res.redirectToNewForm('GalleryViews/newPhoto');
  });

router.get('/:id/edit', (req, res) => {
  galleryFunctions.redirectToEditForm(req, res);
});

router.route('/:id')
  .get((req, res) => {
    galleryFunctions.getSinglePhoto(req, res);
  })
  .put((req,res) => {
    galleryFunctions.editPhoto(req, res);
  })
  .delete((req, res) => {
    galleryFunctions.destroyPhoto(req, res);
  });