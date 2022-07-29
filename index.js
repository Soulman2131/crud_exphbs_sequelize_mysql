//
const express = require('express');
const colors = require('colors');
const mysql = require('mysql2');
const path = require('path');

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

//DB
const db = require('./models');

const app = express();

//BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//HANDLEBARS
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);
app.set('view engine', 'hbs');

//ROUTES
app.use('/', require('./routes/usersCtrl'));

//STATIC (vient aprés la route du HANDLEBARS)
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('home');
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `App listening on mode ${process.env.NODE_ENV} in the port ${process.env.PORT}`.white
          .inverse
      )
    );
  })
  .catch(err => console.log('Err' + err));
