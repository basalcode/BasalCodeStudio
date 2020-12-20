/* query */
const queryObject = require(process.cwd() + '/../../.private/query/api/[ target query path ]');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, dbMember) => {
    log.line.single('[ auth.js ]');

    const method = req.method;

    let response = null;
    switch (method) {
        case 'POST':
            break;
        case 'GET':
            /* basic value */
            log.container.double('STATE: check request values');
            log.message({ method: method });
            log.message({ query: req.query });

            /* verify value */
            // const value = req.query.value;

            log.container.double('ACTION: verfy values');
            log.message({ MESSAGE: 'Verify input values...' });
            try {
                if (1/* filter */) {
                    response = {
                        statusCode: 400,
                        payload: null,
                        errorMessage: 'Invalid ###value###.'
                    };

                    log.container.double('RESULT: error');
                    break;
                }
            } catch (error) {
                /* verify value result */
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to verify ###value###.'
                }

                log.container.double('RESULT: error');
                log.message({ error: error });
                break;
            }
            /* verify value result */
            log.container.double('REULST: success');
            log.message({ MESSAGE: 'Verification success!' });

            /* additional process */

            /* request to DB */
            const query = queryObject[method];
            const values = [ /* value */];
            log.container.double('STATE: check DB query and values');
            log.message({ query: query });
            log.message({ values: values });

            log.container.double('ACTION: request to DB');
            const dbResult = await dbMember./* DB name */.run(query, values);

            /* request to DB result */
            if (!dbResult) {
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to request to DB.'
                }

                log.container.double('RESULT: error');
                break;
            }

            response = {
                statusCode: 200,
                payload: {
                    /* body data here */
                },
                errorMessage: null
            }

            log.container.double('RESULT: success');
            log.message({ dbResult: dbResult });
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
        default:
            response = {
                statusCode: 400,
                payload: null,
                errorMessage: 'Invalid HTTP method.'
            }
            log.container.double('RESULT: success');
            break;
    }
    log.message({ response: response });
    log.print();

    return response;
}