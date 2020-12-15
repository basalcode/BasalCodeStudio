/* module */
const mysql = require('mysql2/promise');
const { getTypeOf } = require('../shared/typeValidation');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');
const type = require(process.cwd() + '/../shared/typeValidation');

const dbMiddleware = (host, user, password, dbName, connectionLimit = 10) => {
    log.line.double('dbMiidleware');

    log.line.single('ACTION');
    log.message({ MESSAGE: 'create db pool.' });
    log.line.single();

    const dbPool = mysql.createPool({
        host: host,
        user: user,
        password: password,
        database: dbName,
        connectionLimit: connectionLimit
    }); 

    const run = async (query, values) => {
        log.line.double('dbMiidleware.run()');

        try {
            const connection = await dbPool.getConnection(async connect => connect);
            try {
                console.log('***********************');
                console.log('[Query Type]', getTypeOf(query));
                console.log('[Values Type]', getTypeOf(values));
                console.log('***********************');
                console.log('[is Query String]', type.isString(query));
                console.log('[is Values Array]', type.isArray(values));
                console.log('***********************');
                console.log('[query]', query);
                console.log('[values]', values);
                console.log('***********************');


                if (type.isString(query) && type.isArray(values)) {
                    const [results, fields] = await connection.query(query, values);

                    response = results;

                    log.line.single('ACTION');
                    log.message({ MESSAGE: 'Request DB success!' });
                    log.message({ response: response });
                    log.line.single();

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

                    log.line.single('ACTION');
                    log.message({ MESSAGE: 'Request DB success!' });
                    log.message({ response: response });
                    log.line.single();

                    connection.release();
                } else {
                    throw Error('Value type of query is not valid. Type is ' + getTypeOf(query) + '.');
                }
            } catch(error) {
                log.line.single('RESPONSE');
                log.message({ ERROR: error });
                log.line.single();

                return false;
            }
        } catch(error) {
            log.line.single('RESPONSE');
            log.message({ ERROR: error });
            log.line.single();

            return false;
        }

        log.line.double();
        log.print();

        return response;
    }

    log.line.double();
    log.print();

    return {
        run: run
    }
}

module.exports = dbMiddleware