/*jshint esversion: 6*/
const GalleryDB = require('../../models').Gallery;

module.exports = (() => {
  const renderFullGallery = (req, res) => {
    GalleryDB.findAll()
      .then(data => {
        console.log(data);
        res.render('home', data);
      })
      .catch(console.log);
  };

  const addNewToGallery = (req, res) => {
    GalleryDB.create({
      title: 'Whatever',
      imgUrl: 'www.google.com',
      description: 'Whatever WHatevre Whatever',
      author: 'Myself'
    })
      .then(res.redirect('/'))
      .catch(console.log);
  };

  const renderNewForm = (req, res) => {

  };

  const renderEditForm = (req, res) => {

  };

  const renderSinglePhoto = (req, res) => {

  };

  const editPhoto = (req, res) => {

  };

  const destroyPhoto = (req, res) => {

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