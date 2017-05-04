/*jshint esversion: 6*/

module.exports = (() => {
  const validateNewUser = (req, res, next) => {
    if (req.body.username.length < 8 || req.body.password.length < 8 || req.body.passVerif !== req.body.password) {
      res.render('LoginViews/newUserPage', {error: 'Check Input And Try Again'});
    } else {
      next();
    }
  };

  return {
    validateNewUser
  };
})();