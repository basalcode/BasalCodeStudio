const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

const errorHandler = require('./src/server/errors');
const DBOperator = require('./src/server/DBOperator');

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
    // key: 'session_cookie_name',
    secret: 'i am not a cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

app.use('/source', express.static('./src/client'));
app.get('/', function (req, res) {
    fs.readFile('./src/client/blog/lobby.html', function (err, data) {
        if (err) {
            res.status(404).send('Not Found');
        } else {
            res.status(200).send(data.toString());
        }
    })
})

app.use('/request/:db/:inputType/:contentType', DBOperator.run);

app.use(errorHandler.error404);
app.use(errorHandler.error500);

app.listen(3000);