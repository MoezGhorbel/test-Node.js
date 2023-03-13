const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const authRole = require('./passport/auth');
require('./passport/bearer');
require('dotenv').config()

const app = express();

const PORT = 3000;
require('./db/connect');
app.get('/', (req, res) => {
    res.status(200);
});

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join('views'));

app.get('/home', (req, res) => {
    res.status(200).render('main')
});

app.get('/dashboard', passport.authenticate('bearer', { session: false }), authRole("ADMIN"), (req, res) => {
    res.status(200).render('dashboard')
});

app.use('/customer', require('./routes/customerRoute'));
app.use('/product', require('./routes/productRoute'));
app.use('/order', require('./routes/orderRoute'));
app.use('/auth', require('./routes/authRoute'));

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server listening on port ${PORT}`)
});