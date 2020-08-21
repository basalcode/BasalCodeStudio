const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');

const app = express();

const errorHandler = require('./errors');
const requestProcessor = require('./requestProcessor');

/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* session-store */
const storeOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1135',
    database: 'sessions',
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 8640000,
    createDatabaseTable: true,
    connectionLimit: 1,
    endConnectionOnClose: true,
    charset: 'utf8mb4_unicode_ci',
    schema: {
        tableName: 'session',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}
const sessionStore = new MySQLStore(storeOptions);

/* session */
app.use(session({
    secret: 'i am not a cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

// To change developmentMode as false,
// the "start" value on package.json should be modified 
// as "export PORT=3001 && react-scripts start"
const developmentMode = true;
if (developmentMode) {
    //Client Side Rendering
    app.use('/request/:dbType/:inputType/:contentType', requestProcessor);

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