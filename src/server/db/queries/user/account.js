const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');
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
            let dbResult = await dbOperator(dbMembers, queryObject);
            
            if (dbResult.length === 0) {
                return 'The email or password you entered is incorrect.';
            }

            if (password === dbResult[0].password) {
                requestObject.session.login = true;
                return true;
            } else {
                return false;
            }
        }
    }
    return contentQueries[inputType]();
}