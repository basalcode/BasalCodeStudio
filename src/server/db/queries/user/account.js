const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');
const resultObject = require('../../resultObject');

const isUndefined = require('../../../module/verifyValue').isUndefined;
const isEmail = require('../../../module/verifyForm').isEmail;
const isPassword = require('../../../module/verifyForm').isPassword;
const hasNoSpecialCharacter = require('../../../module/verifyForm').hasNoSpecialCharacter;

const bcrypt = require('../../../auth/bcrypt');

const ilog = require('../../../module/improvedConsoleLog');
const session = require('express-session');


module.exports = async function (dbMembers) {
    let requestObject = dbMembers.requestObject;
    let responseObject = dbMembers.responseObject;
    let InputType = dbMembers.InputType;
    let inputType = dbMembers.inputType;

    let contentQueries = {
        async [InputType.CREATE]() {
            let requestBody = requestObject.body;
            let email = requestBody.email;
            let password = requestBody.password;
            let confirmPassword = requestBody.confirmPassword;
            let userName = requestBody.userName;
            if (!(email && isEmail(email))) {
                const INVALID_EMAIL_MESSAGE = 'Invalid email address.';
                return resultObject(false, INVALID_EMAIL_MESSAGE);
            }
            if (!(password && isPassword(password))) {
                const INVALID_PASSWORD_MESSAGE = 'Invalid password.';
                return resultObject(false, INVALID_PASSWORD_MESSAGE);
            }
            if (confirmPassword !== password) {
                const PASSWORD_NOT_MATCH_MESSAGE = 'Confirm passwords do not match.';
                return resultObject(false, PASSWORD_NOT_MATCH_MESSAGE);
            }
            if (!(userName && hasNoSpecialCharacter(userName))) {
                const INVALID_USERNAME_MESSAGE = 'Invalid userName.';
                return resultObject(false, INVALID_USERNAME_MESSAGE);
            }

            let hashcode;
            await bcrypt.hash(password)
                .then((resolve) => {
                    hashcode = resolve;
                }, (reject) => {
                    const HASHING_FAILED = reject;
                    return resultObject(false, HASHING_FAILED);
                })

            let query = `
                INSERT INTO account (
                    email, 
                    hashcode, 
                    user_name
                )
                VALUES ( ?, ?, ? );
            `;
            let values = [
                email,
                hashcode,
                userName
            ];

            queryObject.push(query, values, null);
            let dbResult = await dbOperator(dbMembers, queryObject);
            // ilog.all({dbResult: dbResult});

            if (!isUndefined(dbResult)) {
                const REGISTER_SUCCESS_MESSAGE = 'Great! Your Account has been created successfully.';
                return resultObject(true, REGISTER_SUCCESS_MESSAGE);
            } else {
                const REGISTER_FAILED_MESSAGE = 'Failed to register an user account. Please try again later.';
                return resultObject(false, REGISTER_FAILED_MESSAGE);
            }
        },
        async [InputType.READ]() {
            const Page = {
                LOG_IN: 'login',
                SIGN_UP: 'signup'
            }

            let requestQuery = requestObject.query;
            let queryPage = requestQuery.page
            if (queryPage === Page.LOG_IN) {
                if (!requestObject.session.isLoggedIn) {
                    let requestBody = requestObject.body;
                    let email = requestBody.email;
                    let password = requestBody.password;

                    let query = `
                        SELECT 
                            email,
                            hashcode,
                            user_name
                        FROM account
                        WHERE email = ?
                    `;
                    let values = [email];

                    queryObject.push(query, values, null);
                    let dbResult = (await dbOperator(dbMembers, queryObject))[0];
                    // ilog.all({ dbResult: dbResult });
                    if (isUndefined(dbResult)) {
                        const ERROR_MESSAGE = 'The email or password you entered is incorrect.';
                        return resultObject(false, ERROR_MESSAGE);
                    }

                    return await bcrypt.compare(password, dbResult.hashcode)
                        .then((resolve) => {
                            const LOGIN_SUCCESS = resolve;
                            if (LOGIN_SUCCESS) {
                                let accountInformation = {
                                    email: dbResult.email,
                                    user_name: dbResult.user_name,
                                };
                                
                                requestObject.session.isLoggedIn = LOGIN_SUCCESS;
                                requestObject.session.email = dbResult.email;
                                requestObject.session.user_name = dbResult.user_name;

                                return resultObject(true, accountInformation);
                            } else {
                                const LOGIN_FAILED_MESSAGE = 'The email or password you entered is incorrect.';
                                return resultObject(false, LOGIN_FAILED_MESSAGE);
                            }
                        }, (reject) => {
                            const VERIFICATION_FAILD_MESSAGE = reject;
                            return resultObject(false, VERIFICATION_FAILD_MESSAGE);
                        })
                } else {
                    let accountInformation = {
                        email: requestObject.session.email,
                        user_name: requestObject.session.user_name,
                    };
                    return resultObject(true, accountInformation);
                }
            } else if (queryPage === Page.SIGN_UP) {
                let queryEmail = requestQuery.email;
                let query = `
                    SELECT
                        email
                    FROM account
                    WHERE email = ?
                `;
                let values = [queryEmail];
                queryObject.push(query, values, null);

                let dbResult = (await dbOperator(dbMembers, queryObject))[0];

                if (!isUndefined(dbResult)) {
                    return resultObject(false, 'Email is already in use.');
                } else {
                    return resultObject(true, 'Welcome!');
                }
            } else {
                throw new Error(`[Error] account.js: Invalid \'page\' query.`);
            }
        }
    }
    return contentQueries[inputType]();
}