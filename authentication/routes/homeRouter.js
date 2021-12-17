const express = require('express');
const homeRouter = express.Router();

const isLoggedIn = false;

homeRouter.get('/', (req, res) => {
  if(isLoggedIn) return res.render('home/home');
  res.redirect('/account/login');
})

module.exports = {
  homeRouter,
}