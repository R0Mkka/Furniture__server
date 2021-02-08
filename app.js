// packages
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// app
const app = express();

// constants
const { PORT, DB_USER, DB_PASSWORD, DB_NAME, SECRET_KEY } = process.env;

// passport init
require('./auth/passport-login-strategy');
require('./auth/passport-jwt-strategy');

// add locals
app.locals.moment = require('moment');

app.use(morgan('combined'));
app.use(cors(require('./cors')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser(SECRET_KEY));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

require('./routes')(app);

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.p4tva.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
)
.then(() => {
    app.listen(PORT, () => {
        console.log(`DB was connected!`);
        console.log(`App is listening on port: ${PORT}...`);
    });
})
.catch(error => {
    console.error('Mongo connection error!');
    console.error(error);
    return;
});
