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
      username: data[0].dataValues.username
    };
  };
  const prepareBodyRender = (data) => {
    return {
      id: data.id,
      title: data.title,
      imgUrl: data.imgUrl,
      description: data.description,
      username: data.username
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
      console.log(req.user);
      return {
        firstname: req.user.firstname
      };
    } else {
      return false;
    }
  };

  const prepareAdd = (req) => {
    console.log(req.user);
    return {
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
      username: req.user.username
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