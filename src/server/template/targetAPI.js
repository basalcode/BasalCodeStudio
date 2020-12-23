/* query */
const queryObject = require(process.cwd() + '/../../.private/query/api/[ target query path ]');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, dbMember) => {
    log.line.single('[ targetAPI.js ]');

    log.container.double('ACTION: verify values');

    const method = req.method;

    let response = null;
    switch (method) {
        case 'POST':
            break;
        case 'GET':
            /* verify value */
            // const value = decodeURIComponent(req.query.value);
            log.container.double('ACTION: verify values');
            log.message({ method: method });
            log.message({ query: req.query });
            try {
                if (1/* filter */) {
                    response = {
                        statusCode: 400,
                        payload: null,
                        errorMessage: 'Invalid ###value###.'
                    };

                    log.container.double('RESULT: [error] verify values');
                    break;
                }
            } catch (error) {
                /* verify value result */
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to verify ###value###.'
                }

                log.container.double('RESULT: [error] verify values');
                log.message({ error: error });
                break;
            }
            /* verify value result */
            log.container.double('REULST: [success] verify values');

            /* additional process */

            /* request to DB */
            const query = queryObject[method];
            const values = [ /* value */];

            log.container.double('ACTION: request to DB');
            log.message({ query: query });
            log.message({ values: values });
            log.print();

            const dbResult = await dbMember./* DB name */.run(query, values);

            /* request to DB result */
            if (!dbResult) {
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to request to DB.'
                }

                log.container.double('RESULT: [error] request to DB');
                break;
            } else {
                response = {
                    statusCode: 200,
                    payload: {
                        /* body data here */
                    },
                    errorMessage: null
                }

                log.container.double('RESULT: [success] request to DB');
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
            log.container.double('RESULT: [error] Invalid HTTP method');
            break;
    }
    log.message({ response: response });
    log.print();

    return response;
}