const express = require('express');
const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const session = require('./auth/session');

const app = express();

const errorHandler = require('./errors');
const requestProcessor = require('./db/requestProcessor');
const authProcessor = require('./auth/authProcessor')

/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* session */
app.use(session);

// To change developmentMode as false,
// the "start" value on package.json should be modified 
// as "export PORT=3001 && react-scripts start"
const developmentMode = true;
if (developmentMode) {
    //Client Side Rendering
    app.use('/request/:dbType/:inputType/:contentType', requestProcessor);
    app.use('/auth/:inputType/:session', authProcessor);

    app.use(errorHandler.error404);
    app.use(errorHandler.error500);

    app.listen(3001);
} else {
    //Server Side Rendering
    // After Apply Redux
    app.get('/*', (req, res) => {
        res.sendfile(path.join(__dirname, '../index.html'));
    })

    // Before Apply Redux
    /* app.use('/', express.static(path.resolve(__dirname, '../../build')));
    app.get('*', (req, res, next) => {
        if (req.path.split('/')[1] === 'static') {
            return next();
        }
        console.log(__dirname);

        res.sendFile(path.resolve(__dirname, '../../build/index.html'));
    }); */

    app.listen(3000);
}