const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');
const resultObject = require('../../resultObject');

const isUndefined = require('../../../module/verifyValue').isUndefined;

const ilog = require('../../../module/improvedConsoleLog');

module.exports = async function (dbMembers) {
    let requestObject = dbMembers.requestObject;
    let responseObject = dbMembers.responseObject;
    let InputType = dbMembers.InputType;
    let inputType = dbMembers.inputType;

    ilog.all({inputType:inputType})

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
            let values = [ email ];

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
        }
    }
    return contentQueries[inputType]();
}