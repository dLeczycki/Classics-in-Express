const express = require('express');
const accountRouter = express.Router();
const {db} = require('../db/db');

accountRouter.get('/login', (req, res) => {
  return res.render('account/login');
})

accountRouter.post('/login', (req, res) => {
  return res.send('login');
})

accountRouter.get('/register', (req, res) => {
  return res.render('account/register');
})

accountRouter.post('/register', (req, res) => {
  return res.send('register');
})

module.exports = {
  accountRouter,
}