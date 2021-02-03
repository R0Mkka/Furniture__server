// packages
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// app
const app = express();

// constants
const { PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

app.use(morgan('combined'));
app.use(cors(require('./cors')));
app.use(bodyParser.json());

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
