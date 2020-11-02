/* express */
const express = require('express');
const app = express();

/* body parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* session */
const session = require('./session/session');
app.use(session);

/* api */
const emailProcessor = require('./email/emailProcessor');
const requestProcessor = require('./db/requestProcessor');
const sessionProcessor = require('./session/sessionProcessor');
const errorHandler = require('./errors');

/* api */
app.use('/email/:type', emailProcessor);
app.use('/api/:dbType/:inputType/:contentType', requestProcessor);
app.use('/auth/:inputType/:session', sessionProcessor);

/* error handler */
app.use((req, res, next) => {
    res.status(404).send('404 NOT FOUND!');
});
app.use((err, req, res, next) => {
    res.status(500).send('500 INTERNAL SERVER ERROR!');
});

app.listen(3030);