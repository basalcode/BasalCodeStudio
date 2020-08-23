const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');
const resultObject = require('../../resultObject');

const isUndefined = require('../../../module/verifyValue').isUndefined;
const isEmail = require('../../../module/verifyForm').isEmail;

const ilog = require('../../../module/improvedConsoleLog');
const { isPassword } = require('../../../module/verifyForm');

module.exports = async function (dbMembers) {
    let requestObject = dbMembers.requestObject;
    let responseObject = dbMembers.responseObject;
    let InputType = dbMembers.InputType;
    let inputType = dbMembers.inputType;

    ilog.all({ inputType: inputType })

    let contentQueries = {
        async [InputType.CREATE]() {
            let requestBody = requestObject.body;
            let email = requestBody.email;
            let password = requestBody.password;
            let userName = requestBody.userName;

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
            return await dbOperator(dbMembers, queryObject);
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