/* private */
const queryObject = require(process.cwd() + '/../../.private/query/api/user/user');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');
const formValue = require(process.cwd() + '/../shared/formValidation');
const bcrypt = require(process.cwd() + '/../shared/bcrypt');

module.exports = async (req, dbMember) => {
    log.line.single('[ user.js ]');

    const method = req.method;

    let response = null;
    switch (method) {
        case 'POST':
            /* basic value */
            log.container.double('STATE: check request values');
            log.message({ method: method });
            log.message({ body: req.body });

            /* verify value */
            const body = req.body;
            const email = body.email;
            const userName = body.userName;
            const password = body.password;

            log.container.double('ACTION: verfy values');
            log.message({ MESSAGE: 'Verify input values...' });
            try {
                if (!formValue.isEmail(email)) {
                    response = {
                        statusCode: 400,
                        payload: null,
                        errorMessage: 'Invalid email address.'
                    };

                    log.container.double('RESULT: error');
                    break;
                }

                if (!formValue.isEngKorNumber(userName)) {
                    response = {
                        statusCode: 400,
                        payload: null,
                        errorMessage: 'Invalid user name.'
                    };

                    log.container.double('RESULT: error');
                    break;
                }

                if (!formValue.isPassword(password)) {
                    response = {
                        statusCode: 400,
                        payload: null,
                        errorMessage: 'Invalid user name.'
                    };

                    log.container.double('RESULT: error');
                    break;
                }
            } catch (error) {
                /* verify value result */
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to verify value.'
                }

                log.container.double('RESULT: error');
                log.message({ error: error });
                break;
            }
            
            /* verify value result */
            log.container.double('REULST: success');
            log.message({ MESSAGE: 'Verification success!' });

            /* additional process */
            log.container.double('ACTION: hash password');

            let hashcode;
            try {
                hashcode = await bcrypt.hash(password);

                log.container.double('REULST: success');
                log.message({ MESSAGE: 'Hash password success!' });
                log.message({ hashcode: hashcode })

            } catch(error) {
                response = {
                    statusCode: 500,
                    payload: null,
                    errorMessage: 'Failed to hash password.'
                }

                log.container.double('RESULT: error');
                log.message({ error: error });
                break;
            }

            /* request to DB */
            const query = queryObject[method];
            const values = [
                email,
                userName,
                hashcode
            ];
            log.container.double('STATE: check DB query and values');
            log.message({ query: query });
            log.message({ values: values });

            log.container.double('ACTION: request to DB');
            
            const dbResult = await dbMember.user.run(query, values);

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

                },
                errorMessage: null
            }

            log.container.double('RESULT: success');
            break;
        case 'GET':
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