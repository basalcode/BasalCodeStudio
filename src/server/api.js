const express = require('express');

const bodyParser = require('body-parser');
const session = require('./session/session');

const app = express();

const requestProcessor = require('./db/requestProcessor');
const sessionProcessor = require('./session/sessionProcessor');
const errorHandler = require('./errors');

/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* session */
app.use(session);

/* api */
app.use('/mail', function(req, res) {
    console.log('[req.body]', req.body);

    res.send({result: 'response test'});
});

app.use('/api/:dbType/:inputType/:contentType', requestProcessor);
app.use('/auth/:inputType/:session', sessionProcessor);

app.listen(3030);