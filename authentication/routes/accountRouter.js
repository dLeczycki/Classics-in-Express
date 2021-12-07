const express = require('express');
const accountRouter = express.Router();

accountRouter.post('/login', (req, res) => {
  return res.send('login');
})

accountRouter.post('/register', (req, res) => {
  return res.send('register');
})

module.exports = {
  accountRouter,
}