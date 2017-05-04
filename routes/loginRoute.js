/*jshint esversion: 6*/
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('LoginViews/loginPage');
  })
  .post(passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login'
  }));

router.route('/new')
  .get((req, res) => {
    res.render('LoginViews/newUserPage');
  });

module.exports = router;