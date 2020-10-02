const express = require('express');
const fs = require('fs');
const path = require('path');

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

app.use('/', express.static(path.resolve(__dirname, '../../build')));
app.get('*', (req, res, next) => {
    if (req.path.split('/')[1] === 'static') {
        return next();
    }
    console.log(__dirname);

    res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.use('/request/:dbType/:inputType/:contentType', requestProcessor);
app.use('/auth/:inputType/:session', sessionProcessor);

app.listen(3000);