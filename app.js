const express = require('express');
const router = require('./routes/router');
const path = require('path');
const expresshbs = require('express-handlebars');

const app = express();
const hbs = expresshbs.create({
  extname: 'hbs',
  defaultLayout: false,
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials'
})
app.engine('hbs', hbs.engine);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use(router);

app.listen(3000);
