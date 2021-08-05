const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const helmet = require('helmet');
const session = require('cookie-session');
const nocache = require('nocache');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://new-userDB:sagat9011@cluster0.kfvhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // Options pour sécuriser les cookies
const expiryDate = new Date(Date.now() + 3600000); // 1 heure (60 * 60 * 1000)
app.use(session({
  name: 'session',
  secret: process.env.SEC_SES,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: expiryDate
  }
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(helmet());

app.use(nocache());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);     
app.use('/api/auth', userRoutes);

module.exports = app;