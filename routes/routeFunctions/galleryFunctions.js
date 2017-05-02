/*jshint esversion: 6*/
const galDB = require('./DBFunctions.js');
const helper = require('./helperFunctions.js');

module.exports = (() => {
  const renderFullGallery = (req, res) => {
    galDB.getAllPhotos()
      .then(data => {
        res.render('home', createObject(data));
      })
      .catch(err => {
        console.log(err);
        res.render('error404');
      });
  };

  const addNewToGallery = (req, res) => {
    galDB.postNewPhoto(rebuildObject(req.body))
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
    res.render('GalleryViews/newPhotoForm', rebuildObject(req.body));
  };

  const renderSinglePhoto = (req, res) => {
    galDB.getPhotoById(req.params.id);
  };

  const editPhoto = (req, res) => {
    galDB.updatePhotoById(req.params.id, rebuildObject(req.body));
  };

  const destroyPhoto = (req, res) => {
    galDB.deletePhotoById(req.params.id);
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

const createObject = (data) => {
  return {photos: data.reduce((prev, curr) => {
    prev.push(curr.dataValues);
    return prev;
  },[])};
};

const rebuildObject = (data) => {
  return {
    title: data.title,
    imgUrl: data.imgUrl,
    description: data.description,
    author: data.author
  };
};