/* module */
const mysql = require('mysql');

/* private */
const private = require(process.cwd() + '/../../.private/security/db');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

let db = mysql.createConnection({
    host: private.host,
    user: private.user,
    password: private.password,
    database: private.names
});

module.exports = (query, values) => {
    log.line.double('dbMiddleware.js');

    db.connect(error => {
        if (error) throw error;

        log.line.single('ACTION');
        log.message({ MESSAGE: 'Connect DB success!' });
        log.line.single();
    });
    
    if (typeof query === 'string') {
        db.query(query, values, (error, results, fields) => {
            if (error) throw error;
    
            log.line.single('ACTION');
            log.message({ MESSAGE: 'Request DB success!' });
            log.message({ RESULT: result });
            log.line.single();
        });
    }

    db.end(error => {
        if (error) throw error;

        log.line.single('ACTION');
        log.message({ MESSAGE: 'Disconnect DB success!' });
        log.line.single();
    });

    log.line.double();
    log.print();

    return ;
}