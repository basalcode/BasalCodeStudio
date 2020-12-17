/* query */
const queryObject = require(process.cwd() + '/../../.private/query/api/[ target query path ]');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, dbMember) => {
    log.line.single('[ targetAPI.js ]');

    const method = req.method;

    let response = null;
    switch (method) {
        case 'POST':
            break;
        case 'GET':
            /* check value */
            const email = req.query.email;
            
            log.container.double('STATE: check request values');
            log.message({ method: method });
            log.message({ query: req.query });
            
            log.container.double('ACTION: verfy values');
            log.message({ MESSAGE: 'Verify input values...' });
            try {
                if ('[ 검증식 ]') {
                    response = {
                        statusCode: 400,
                        payload: null,
                        errorMessage: 'Invalid input value.'
                    };

                    log.container.double('RESULT: error');
                    log.message({ response: response });
                    break;
                }
            } catch (error) {
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to verify value.'
                }

                log.container.double('RESULT: error');
                log.message({ response: response });
                log.message({ error: error });
                break;
            }

            log.container.double('REULST: success');
            log.message({ MESSAGE: 'Verification success!' });

            /* request to DB */
            const query = queryObject[method];
            const values = [email];
            log.container.double('STATE: check DB query and values');
            log.message({ query: query });
            log.message({ values: values });

            log.container.double('ACTION: verfy values');
            const dbResult = await dbMember.user.run(query, values);

            if (dbResult.length === 0) {
                response = {
                    statusCode: 200,
                    payload: {
                        availability: true,
                    },
                    errorMessage: null 
                }

                log.container.double('RESULT: success');
                log.message({ response: response });
            } else {
                response = {
                    statusCode: 200,
                    payload: {
                        availability: false,
                    },
                    errorMessage: null
                }

                log.container.double('RESULT: success');
                log.message({ response: response });
            }
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
            log.message({ response: response });
            break;
    }
    log.print();

    return response;
}