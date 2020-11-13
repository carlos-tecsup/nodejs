const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const path = require('path');
const morgan = require('morgan');
const db = require('./db');

const port = process.env.PORT || 8080;
//passport config:
require('./config/passport')(passport)
//mongoose

app.use(express.urlencoded({extended: false}))
//EJS
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'));
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
const indexRoutes = require('./routes/index');

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(express.urlencoded({extended: false}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })
    
//Routes
app.use('/', indexRoutes);
app.use('/users',require('./routes/users'));

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})

