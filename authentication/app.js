require("dotenv").config();
const express = require('express');
require('express-async-errors');
const {engine} = require('express-handlebars');
const cookieParser = require('cookie-parser');

const {authRouter} = require('./routes/auth-router');
const {handleError} = require('./utils/errors');
const { requireAuth, checkUser } = require("./middleware/auth-middleware");

const port = process.env.PORT || 3000;

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

// view engine
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.set('views', './views');

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/protected', requireAuth, (req, res) => res.render('protected'));
app.use(authRouter);

app.use((req, res, next) => {
  res.render('404');
})
app.use(handleError);

app.listen(port, () => console.log(`Authentication app listens on port ${port}!`));