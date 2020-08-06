const queryObject = require('../../queryObject');

module.exports = function (dbMembers) {
    let requestObject = dbMembers.requestObject;
    let logDB = dbMembers.logDB;
    let InputType = dbMembers.InputType;
    let inputType = dbMembers.InputType.CREATE;

    let contentQueries = {
        async [InputType.CREATE]() {
            let query = `
                INSERT INTO request_log (
                    type,
                    method, 
                    ip_address, 
                    url, 
                    body
                ) 
                VALUES (?, ?, ?, ?, ?);
            `;
            let values = [
                dbMembers.inputType,
                requestObject.method.toLowerCase(),
                requestObject.headers['x-forwarded-for'],
                requestObject.originalUrl,
                JSON.stringify(requestObject.body)
            ];

            let logResult = await logDB(query, values);
            if (logResult.errno) {
                throw new Error('[Error] requestLog.js : There might be an error in query syntax on \'logDB\'.');
            }
        }
    }
    return contentQueries[inputType]();
}