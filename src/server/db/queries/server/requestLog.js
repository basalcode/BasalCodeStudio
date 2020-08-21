const ilog = require('../../../module/improvedConsoleLog');

module.exports = async function (dbMembers) {
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
                requestObject.headers['x-forwarded-for'][0],
                requestObject.originalUrl,
                JSON.stringify(requestObject.body)
            ];
            
            // ilog.middle(' Log Start ');
            // ilog.all({query: query});
            // ilog.all({values: values});
            let logResult = await logDB(query, values);
            // ilog.middle(' Log End ');
            if (logResult.errno) {
                ilog.all({logResult, logResult});
                throw new Error('[Error] requestLog.js : There might be an error in query syntax on \'logDB\'.');
            }
        }
    }
    return contentQueries[inputType]();
}