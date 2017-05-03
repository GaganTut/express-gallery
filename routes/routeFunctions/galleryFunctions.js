/*jshint esversion: 6*/
const galDB = require('./DBFunctions.js');
const helper = require('./helperFunctions.js');

module.exports = (() => {
  const renderFullGallery = (req, res) => {
    galDB.getAllPhotos()
      .then(data => {
        res.render('home', {photos: helper.createObjectList(data)});
      })
      .catch(err => {
        console.log(err);
        res.render('error404');
      });
  };

  const addNewToGallery = (req, res) => {
    galDB.postNewPhoto(req.body)
      .then(res.redirect('/'))
      .catch(err => {
        console.log(err);
        res.redirect('/new');
      });
  };

  const renderNewForm = (req, res) => {
    res.render('GalleryViews/newPhotoForm');
  };

  const renderEditForm = (req, res) => {
    galDB.getPhotoById(req.params.id)
      .then(data => {
        res.render('GalleryViews/editPhotoForm', helper.prepareDBRender(data));
      });
  };

  const renderSinglePhoto = (req, res) => {
    Promise.all([galDB.getPhotoById(req.params.id), galDB.getAllPhotos()])
      .then(data => {
        res.render('GalleryViews/singlePhoto', {single: helper.prepareDBRender(data[0]), photos: helper.createObjectList(data[1])});
      })
      .catch(console.log);
  };

  const editPhoto = (req, res) => {
    galDB.updatePhotoById(req.params.id, req.body)
      .then(res.redirect(`/gallery/${req.params.id}`))
      .catch(console.log);
  };

  const destroyPhoto = (req, res) => {
    galDB.deletePhotoById(req.body.id)
      .then(res.redirect('/'))
      .catch(res.redirect('/gallery/new'));
  };

  return {
    renderFullGallery,
    addNewToGallery,
    renderNewForm,
    renderEditForm,
    renderSinglePhoto,
    editPhoto,
    destroyPhoto
  };
})();