const express = require('express');
const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const session = require('./session/session');

const app = express();

const errorHandler = require('./errors');
const requestProcessor = require('./db/requestProcessor');
const sessionProcessor = require('./session/sessionProcessor')

/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* session */
app.use(session);

// To change developmentMode as false,
// the "start" value on package.json should be modified 
// as "export PORT=3001 && react-scripts start"
// const developmentMode = true;
// if (developmentMode) {
    //Client Side Rendering
    app.use('/request/:dbType/:inputType/:contentType', requestProcessor);
    app.use('/auth/:inputType/:session', sessionProcessor);

    app.use(errorHandler.error404);
    app.use(errorHandler.error500);

    app.listen(3030);
// } else {
    
// }