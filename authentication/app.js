const express = require('express');
const {accountRouter} = require('./routes/accountRouter');
const {db} = require('./db/db');

const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('Hello World!'));
app.use('/account', accountRouter);


app.listen(port, () => console.log(`Authentication app listens on port ${port}!`));