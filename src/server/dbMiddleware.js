/* module */
const mysql = require('mysql2/promise');
const { getTypeOf } = require('../shared/typeValidation');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');
const type = require(process.cwd() + '/../shared/typeValidation');

const dbMiddleware = (host, user, password, dbName, connectionLimit = 10) => {
    log.line.single('[ dbMiidleware.js ]');

    log.container.double('ACTION');
    log.message({ MESSAGE: 'create db pool.' });

    const dbPool = mysql.createPool({
        host: host,
        user: user,
        password: password,
        database: dbName,
        connectionLimit: connectionLimit
    }); 

    const run = async (query, values) => {
        log.line.single('dbMiidleware.run()');

        try {
            const connection = await dbPool.getConnection(async connect => connect);
            try {
                log.container.double('STATE');
                log.message({ query: query });
                log.message({ values: values });

                if (type.isString(query) && type.isArray(values)) {
                    const [results, fields] = await connection.query(query, values);

                    response = results;

                    log.container.double('ACTION');
                    log.message({ MESSAGE: 'Request DB success!' });
                    log.message({ MESSAGE: 'Single query mode' });
                    log.message({ response: response });

                    connection.release();
                } else if (type.isArray(query) && type.isArray(values)) {
                    if (query.length !== values.length) {
                        throw Error('Length of query and values array is not match.');
                    }
                
                    response = [];

                    for (let i = 0; i < query.length; i++) {
                        const [results, fields] = await connection.query(query[i], values[i]);
                        
                        response.push(results);
                    }

                    log.container.double('ACTION');
                    log.message({ MESSAGE: 'Request DB success!' });
                    log.message({ MESSAGE: 'Multiple query mode' });
                    log.message({ response: response });

                    connection.release();
                } else {
                    throw Error('Value type of query is not valid. Type is ' + getTypeOf(query) + '.');
                }
            } catch(error) {
                log.container.double('RESPONSE');
                log.message({ ERROR: error });

                return false;
            }
        } catch(error) {
            log.container.double('RESPONSE');
            log.message({ ERROR: error });

            return false;
        }
        log.print();

        return response;
    }
    
    log.print();

    return {
        run: run
    }
}

module.exports = dbMiddleware