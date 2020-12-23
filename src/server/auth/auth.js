/* query */
const queryObject = require(process.cwd() + '/../../.private/query/api/auth/auth');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');
const type = require(process.cwd() + '/../shared/formValidation');
const bcrypt = require(process.cwd() + '/../shared/bcrypt');

module.exports = async (req, dbMember) => {
    log.line.single('[ auth.js ]');

    const method = req.method;

    let response = null;
    switch (method) {
        case 'POST':
            break;
        case 'GET':
            /* verify value */
            const email = decodeURIComponent(req.query.email);
            const password = decodeURIComponent(req.query.password);

            log.container.double('ACTION: verfy values');
            log.message({ method: method });
            log.message({ query: req.query });
            let verifyType;
            try {
                verifyType = 'email';
                if (!type.isEmail(email)) {
                    response = {
                        statusCode: 400,
                        payload: null,
                        errorMessage: 'Invalid email address.'
                    };

                    log.container.double('RESULT: [error] verfy values');
                    break;
                }

                verifyType = 'password';
                if (!type.isPassword(password)) {
                    response = {
                        statusCode: 400,
                        payload: null,
                        errorMessage: 'Invalid password value.'
                    };

                    log.container.double('RESULT: [error] verfy values');
                    break;
                }
            } catch (error) {
                /* verify value result */
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: `Failed to verify ${verifyType} value.`
                }

                log.container.double('RESULT: [error] verfy values');
                log.message({ error: error });
                break;
            }

            /* verify value result */
            log.container.double('REULST: [success] verfy values');

            /* request to DB */
            const query = queryObject[method];
            const values = [ email ];

            log.container.double('ACTION: request to DB');
            log.message({ query: query });
            log.message({ values: values });
            log.print();

            const dbResult = await dbMember.user.run(query, values);

            /* request to DB result */
            if (!dbResult) {
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to request to DB.'
                }

                log.container.double('RESULT: [error] request to DB');
                break;
            }
            log.container.double('RESULT: [success] request to DB');
            log.message({ dbResult: dbResult });

            /* additional process */
            if (dbResult.length === 0) {
                response = {
                    statusCode: 200,
                    payload: {
                        isLoggedIn: false,
                        userName: null
                    },
                    errorMessage: null
                }
                log.container.double('RESULT: [success] request to DB');
                break;
            }

            log.container.double('ACTION: compare password and hashcode');
            const hashcode = dbResult[0].hashcode;
            
            log.message({ hashcode: hashcode });
            log.message({ compare_result: bcrypt.compare(password, hashcode) });

            if (!bcrypt.compare(password, hashcode)) {
                response = {
                    statusCode: 200,
                    payload: {
                        isLoggedIn: false,
                        userName: null
                    },
                    errorMessage: null
                }
                log.container.double('RESULT: [success] compare password and hashcode');
                break;
            } 

            const userName = dbResult[0]['user_name'];
            response = {
                statusCode: 200,
                payload: {
                    isLoggedIn: true,
                    userName: userName
                },
                errorMessage: null
            }
            log.container.double('RESULT: [success] compare password and hashcode');

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
            log.container.double('RESULT: [error] invalid HTTP method');
            break;
    }
    log.message({ response: response });
    log.print();

    return response;
}