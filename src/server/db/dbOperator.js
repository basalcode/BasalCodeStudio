const ilog = require('../module/improvedConsoleLog');

module.exports = function run(req, session) {
    return (async () => {
        let dbMembers = require('./dbMembers')(req);
        let dbQueries = require('./dbQueries')(dbMembers).queryObject;

        let DBType = dbMembers.dbType;
        let contentType = dbMembers.contentType;
        let inputType = dbMembers.inputType;

        ilog.middle('TYPE START');
        ilog.all({ DBType: DBType });
        ilog.all({ contentType: contentType });
        ilog.all({ inputType: inputType });
        ilog.middle('TYPE FINISH');

        let queryObject = dbQueries[DBType][contentType][inputType]();
        let queryAmount = dbQueries.getResultLength(DBType);

        let requestResults = [];
        let logResults = [];
        for (let procedureId = 0; procedureId < queryAmount; procedureId++) {
            ilog.middle('DB START');
            ilog.all({ procedureId, procedureId });

            let requestDB = dbMembers.targetDB;
            let query = queryObject.query.shift();
            let values = queryObject.values.shift();
            let errorMessage = queryObject.errorMessage.shift();

            if (errorMessage) {
                return errorMessage;
            } else {
                /* Blog */
                requestResults.push(await requestDB(query, values));

                if (requestResults[requestResults.length - 1].errno) {
                    ilog.all({ requestResults: requestResults });
                    ilog.all({ [queryObject.query]: queryObject.query });
                    ilog.all({ [queryObject.values]: queryObject.values });
                    throw new Error('[Error] dbOperator() : There might be an error in query syntax on \'targetDB DB\'.');
                }

                /* Log */
                let logDBType = dbMembers.DBType.SERVER;
                let logContentType = dbMembers.ContentType.REQUEST_LOG;
                let logInputType = dbMembers.InputType.CREATE;

                ilog.all({ logDBType: logDBType });
                ilog.all({ logContentType: logContentType });
                ilog.all({ logInputType: logInputType });

                let logQueryObject = dbQueries[logDBType][logContentType][logInputType]();

                let logDB = dbMembers.logDB;
                let logQuery = logQueryObject.query.shift();
                let logValues = logQueryObject.values.shift();
                // let serverErrorMessage = serverQueryObject.errorMessage.shift();

                logResults.push(await logDB(logQuery, logValues));

                if (logResults[logResults.length - 1].errno) {
                    // ilog.all({logResults: logResults});
                    // ilog.all({[logQueryObject.query]: logQueryObject.query});
                    // ilog.all({[logQueryObject.values]: logQueryObject.values});

                    throw new Error('[Error] dbOperator() : There might be an error in query syntax on \'server DB\'.');
                }
                ilog.all({ requestResults: requestResults });
                ilog.middle('DB FINISH');
            }
        }
        if (requestResults.length === 1) {
            return requestResults[0];
        } else {
            return requestResults;
        }
    })();
}