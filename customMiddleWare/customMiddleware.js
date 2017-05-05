/*jshint esversion: 6*/

module.exports = (() => {
  const validateNewUser = (req, res, next) => {
    if (req.body.username.length < 8 || req.body.password.length < 8 || req.body.passVerif !== req.body.password) {
      res.render('LoginViews/newUserPage', {error: 'Check Input And Try Again'});
    } else {
      next();
    }
  };

  const userPermission = (req, res, next) => {
    console.log(req.user.id, req.body);
    if (Number(req.user.id) === Number(req.body.UserId)) {
      next();
    } else {
      res.redirect('/gallery');
    }
  };

  return {
    validateNewUser,
    userPermission
  };
})();