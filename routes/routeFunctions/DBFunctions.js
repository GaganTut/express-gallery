/*jshint esversion: 6*/
const GalleryDB = require('../../models').Gallery;

module.exports = (() => {
  const getAllPhotos = () => {
    return GalleryDB.findAll();
  };

  const getPhotoById = (photoId) => {
    return GalleryDB.findAll({
      where: {
        id: photoId
      }
    });
  };

  const postNewPhoto = (data) => {
    return GalleryDB.create(data);
  };

  const updatePhotoById = (photoId, data) => {
    return GalleryDB.update(data, {
      where: {
        id: photoId
      }
    });
  };

  const deletePhotoById = (photoId) => {
    return GalleryDB.destroy({
      where: {
        id: photoId
      }
    });
  };

  return {
    getAllPhotos,
    getPhotoById,
    postNewPhoto,
    updatePhotoById,
    deletePhotoById
  };
})();