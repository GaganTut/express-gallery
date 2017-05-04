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
      author: data[0].dataValues.author
    };
  };
  const prepareBodyRender = (body) => {
    return {
      id: body.id,
      title: body.title,
      imgUrl: body.imgUrl,
      description: body.description,
      author: body.author
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
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log(req);
      return {
        req
      };
    } else {
      console.log('not working');
      return false;
    }
  };

  return {
    createObjectList,
    prepareDBRender,
    prepareBodyRender,
    checkAuth,
    createLoginObject
  };
})();