const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');
const resultObject = require('../../resultObject');

const isUndefined = require('../../../module/verifyValue').isUndefined;
const isEmail = require('../../../module/verifyForm').isEmail;
const isPassword = require('../../../module/verifyForm').isPassword;
const hasNoSpecialCharacter = require('../../../module/verifyForm').hasNoSpecialCharacter;

const ilog = require('../../../module/improvedConsoleLog');


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
                return resultObject(false, 'Invalid email address.');
            }
            if (!(password && isPassword(password))) {
                return resultObject(false, 'Invalid password.');
            }
            if (confirmPassword !== password) {
                return resultObject(false, 'Confirm password do not match.');
            }
            if (!(userName && hasNoSpecialCharacter(userName))) {
                return resultObject(false, 'Invalid userName.');
            }

            let query = `
                INSERT INTO account (
                    email, 
                    password, 
                    user_name
                )
                VALUES ( ?, ?, ? );
            `;
            let values = [
                email,
                password,
                userName
            ];
            queryObject.push(query, values, null);
            let dbResult = await dbOperator(dbMembers, queryObject);
            ilog.all({dbResult: dbResult});

            if (!isUndefined(dbResult)) {
                return resultObject(true, 'Great! Your Account has been created successfully.');
            } else { 
                return resultObject(false, 'Failed to register an user account. Please try again later.');
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
                let requestBody = requestObject.body;
                let email = requestBody.email;
                let password = requestBody.password;

                let query = `
                    SELECT 
                        email,
                        password,
                        user_name
                    FROM account
                    WHERE email = ?
                `;
                let values = [email];

                queryObject.push(query, values, null);
                let dbResult = (await dbOperator(dbMembers, queryObject))[0];

                const ERROR_MESSAGE = 'The email or password you entered is incorrect.';
                if (isUndefined(dbResult)) {
                    return resultObject(false, ERROR_MESSAGE);
                }

                let response = {
                    email: dbResult.email,
                    user_name: dbResult.user_name,
                };

                if (password === dbResult.password) {
                    requestObject.session.login = true;
                    return resultObject(true, response);
                } else {
                    return resultObject(false, ERROR_MESSAGE);
                }
            } else if (queryPage === Page.SIGN_UP) {
                let queryEmail = requestQuery.email;
                let query =`
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