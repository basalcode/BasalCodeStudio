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
            /* verify value */
            const body = req.body;
            const email = decodeURIComponent(body.email);
            const password = decodeURIComponent(body.password);

            log.container.double('ACTION: verfy values');
            log.message({ method: method });
            log.message({ body: body });

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
            const values = [email];

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

            try {
                log.container.double('ACTION: compare password and hashcode');
                const hashcode = dbResult[0].hashcode;
                const compareResult = await bcrypt.compare(password, hashcode);

                log.message({ hashcode: hashcode });
                log.message({ compareResult: compareResult });

                if (!compareResult) {
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
            } catch (error) {
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to compare password and hashcode.'
                }
                log.container.double('RESULT: [error] compare password and hashcode');
                break;
            }

            const authData = {
                isLoggedIn: true,
                email: dbResult[0]['email'],
                userName: dbResult[0]['user_name']
            }

            response = {
                statusCode: 200,
                payload: authData,
                errorMessage: null
            }
            log.container.double('RESULT: [success] compare password and hashcode');

            try {
                log.container.double('ACTION: save auth to session');
                
                req.session.auth = authData;
            } catch (error) {
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to save auth data to session.'
                }

                log.container.double('RESULT: [error] save auth to session');
                break;
            }
            log.container.double('RESULT: [success] save auth to session');
            log.message({ session_auth : req.session.auth });

            break;
        case 'GET':
            /* request to session */
            let payload = null;
            try {
                log.container.double('ACTION: load auth to session');
                
                payload = req.session.auth;

            } catch (error) {
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to load auth data to session.'
                }

                log.container.double('RESULT: [error] save auth to session');
                break;
            }

            response = {
                statusCode: 200,
                payload: payload,
                errorMessage: null
            }

            log.container.double('RESULT: [success] save auth to session');
            log.message({ session_auth : req.session.auth });

            break;
        case 'PUT':
            break;
        case 'DELETE':
            /* request to session */
            try {
                log.container.double('ACTION: remove auth from session');
                
                req.session.destroy();

            } catch (error) {
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to load auth data to session.'
                }

                log.container.double('RESULT: [error] save auth to session');
                break;
            }

            response = {
                statusCode: 200,
                payload: {
                    isLoggedIn: false,
                    email: '',
                    userName: ''
                },
                errorMessage: null
            }
            log.container.double('RESULT: [success] save auth to session');

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