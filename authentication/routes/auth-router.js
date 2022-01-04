const {Router} = require('express');
const { body } = require('express-validator');

const {signup_get, signup_post, login_get, login_post, logout_get} = require('../controllers/auth-controller');

const authRouter = Router();

authRouter
  .get('/signup', signup_get)
  .post('/signup', 
    body('email').isEmail().withMessage('Invalid email address'), 
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'), 
    signup_post)
  .get('/login', login_get)
  .post('/login', login_post)
  .get('/logout', logout_get)

module.exports = {
  authRouter,
}