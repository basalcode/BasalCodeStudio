const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');

module.exports = function (dbMembers) {
    let requestObject = dbMembers.requestObject;
    let InputType = dbMembers.InputType;
    let inputType = dbMembers.inputType;

    let contentQueries = {
        [InputType.CREATE]() {
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
            return dbOperator(dbMembers, queryObject);
        }
    }
    return contentQueries[inputType]();
}