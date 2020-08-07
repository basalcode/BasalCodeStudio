const ilog = require('../module/improvedConsoleLog');

module.exports = async function (dbMembers, queryObject) {
    let requestResults = [];

    let queryAmount = queryObject.getLength();
    for (let procedureId = 0; procedureId < queryAmount; procedureId++) {
        ilog.middle(' DB START ');
        let requestDB = dbMembers.requestDB;
        let { query, values, errorMessage } = queryObject.shift();

        if (errorMessage) {
            return errorMessage;
        } else {
            requestResults.push(await requestDB(query, values));
            if (requestResults[requestResults.length - 1].errno) {
                throw new Error('[Error] dbOperator() : There might be an error in query syntax on \'requestDB\'.');
            }

            ilog.all({ requestResults: requestResults });
            ilog.middle(' DB FINISH ');
        }

        if (requestResults.length === 1) {
            return requestResults[0];
        } else {
            return requestResults;
        }
    }
}