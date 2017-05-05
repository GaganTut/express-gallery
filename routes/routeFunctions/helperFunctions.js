/*jshint esversion: 6*/

module.exports = (() => {
  const createObjectList = (data) => {
    return data.reduce((prev, curr) => {
      prev.push(curr.dataValues);
      return prev;
    },[]);
  };

  const prepareDBRender = (data) => {
    return {
      id: data[0].dataValues.id,
      title: data[0].dataValues.title,
      imgUrl: data[0].dataValues.imgUrl,
      description: data[0].dataValues.description,
      UserId: data[0].dataValues.UserId
    };
  };
  const prepareBodyRender = (data) => {
    return {
      id: data.id,
      title: data.title,
      imgUrl: data.imgUrl,
      description: data.description,
      UserId: data.UserId
    };
  };

  const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  };

  const createLoginObject = (req) => {
    if (req.isAuthenticated()) {
      return {
        firstname: req.user.firstname
      };
    } else {
      return false;
    }
  };

  const prepareAdd = (req) => {
    return {
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
      UserId: req.user.id
    };
  };

  return {
    createObjectList,
    prepareDBRender,
    prepareBodyRender,
    checkAuth,
    createLoginObject,
    prepareAdd
  };
})();