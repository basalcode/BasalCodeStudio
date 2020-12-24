const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const privateDB = require('../../.private/security/db.js');
const sessionSecretCode = require('../../.private/security/session.js').sessionSecretCode;

/* session-store */
const storeOptions = {
    host: 'localhost',
    port: 3306,
    user: privateDB.user,
    password: privateDB.password,
    database: privateDB.name.sessions,
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

module.exports = session({
    secret: sessionSecretCode,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
})

