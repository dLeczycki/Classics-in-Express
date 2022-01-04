const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const {UserRecord} = require('../records/user.record');

const tokenMaxAge =  60 * 60 * 24 * 3;
const createToken = (id) =>  jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: tokenMaxAge});

const signup_get = (req, res) => {
  res.render('signup');
}

const login_get = (req, res) => {
  res.render('login');
}

const signup_post = async (req, res) => {
  const {email, password} = req.body;
  const {errors: validationErrors} = validationResult(req);
  const errors = {email: '', password: '', exists: ''};

  if(validationErrors.length > 0) {
    validationErrors.forEach(validationError => errors[validationError.param] = validationError.msg);
    return res.render('signup', {errors});
  }
  if(await UserRecord.findOneByEmail(email)) {
    errors.exists = 'User already exists';
    return res.render('signup', {errors});
  }

  const user = new UserRecord({email, password});
  await user.insert();

  const token = createToken(user.id);
  res.cookie('jwt', token, {httpOnly: true, maxAge: tokenMaxAge * 1000});

  return res.status(201).redirect('/protected');
}

const login_post = async (req, res) => {
  const {email, password} = req.body;

  const user = await UserRecord.login(email, password);
  if(!user) return res.render('login', {error: 'Username or password is invalid'});
  
  const token = createToken(user.id);
  res.cookie('jwt', token, {httpOnly: true, maxAge: tokenMaxAge * 1000});

  return res.status(200).redirect('/protected');
}

const logout_get = async (req, res) => {
  res.cookie('jwt','', {maxAge: 1});

  return res.redirect('/');
}

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
}