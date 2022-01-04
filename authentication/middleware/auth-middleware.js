const {verify} = require('jsonwebtoken');
const { UserRecord } = require('../records/user.record');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if(token){
    verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(err) {
        console.log(err.message);
        res.locals.user = null;
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if(err) {
        console.log(err.message);
      } else {
        console.log(decodedToken);
        let user = await UserRecord.findOneById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = {
  requireAuth,
  checkUser,
}