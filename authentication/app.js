const express = require('express');
const {engine} = require('express-handlebars');
const {join} = require('path');

const {accountRouter} = require('./routes/accountRouter');
const {homeRouter} = require('./routes/homeRouter');
const {db} = require('./db/db');

const app = express();
const port = 3000;
const publicPath = join(__dirname, 'views');

app.use(express.urlencoded(
  { 
    extended: true,
  }));
app.use(express.static(publicPath));
app.use(express.json());
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', homeRouter);
app.use('/account', accountRouter);


app.listen(port, () => console.log(`Authentication app listens on port ${port}!`));