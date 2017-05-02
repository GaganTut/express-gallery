/*jshint esversion: 6*/
const GalleryDB = require('../../models').Gallery;

module.exports = (() => {
  const renderFullGallery = (req, res) => {
    GalleryDB.findAll()
      .then(data => {
        res.render('home', createObject(data));
      })
      .catch(err => {
        console.log(err);
        res.render('error404');
      });
  };

  const addNewToGallery = (req, res) => {
    GalleryDB.create({
      title: 'anything',
      imgUrl: 'www.amazon.com',
      description: 'erherthehteht WHatevre Whatever',
      author: 'no One'
    })
      .then(res.redirect('/'))
      .catch(err => {
        console.log(err);
        res.redirect('/new');
      });
  };

  const renderNewForm = (req, res) => {
    res.render('newPhotoForm');
  };

  const renderEditForm = (req, res) => {
    res.render('newPhotoForm', req.body);
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

const createObject = (data) => {
  return {photos: data.reduce((prev, curr) => {
    prev.push(curr.dataValues);
    return prev;
  },[])};
};