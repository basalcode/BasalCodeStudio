const DBOperator = (function () {
    function run(req) {
        return (async () => {
            let dbMembers = require('./DBmembers')(req);
            let dbQueries = require('./DBQueries')(dbMembers).queryObject;

            let DBType = dbMembers.dbType;
            let contentType = dbMembers.contentType;
            let inputType = dbMembers.inputType;

            console.log('[ Target DB Type ]');
            console.log(DBType);
            console.log('[ Target Content Type ]');
            console.log(contentType);
            console.log('[ Target Input Type ]');
            console.log(inputType);

            // console.log('[ queryObject ]', dbQueries);
            // console.log('[ queryObject ]', dbQueries[DBType]);
            // console.log('[ queryObject ]', dbQueries[DBType][contentType]);
            // console.log('[ queryObject ]', dbQueries[DBType][contentType][inputType]());
            // console.log('[ queryAmount ]', dbQueries.getResultLength(DBType));

            let queryObject = dbQueries[DBType][contentType][inputType]();
            let queryAmount = dbQueries.getResultLength(DBType);

            let requestResults = [];
            let logResults = [];
            for (let procedureId = 0; procedureId < queryAmount; procedureId++) {
                console.log('=============== DB START ===============')
                console.log('[procedureId]', procedureId)
                
                let requestDB =  dbMembers.targetDB;
                let query = queryObject.query.shift();
                let values = queryObject.values.shift();
                let errorMessage = queryObject.errorMessage.shift();

                if (errorMessage) {
                    return errorMessage;
                } else {
                    /* Blog */
                    requestResults.push(await requestDB(query, values));

                    if (requestResults[requestResults.length - 1].errno) {
                        // console.log('[ Request Result ]');
                        // console.log(requestResults);
                        // console.log('[ Request Query ]');
                        // console.log(queryObject.query);
                        // console.log('[ Request Values ]');
                        // console.log(queryObject.values);
                        throw new Error('[Error] run() : There might be an error in query syntax on \'targetDB DB\'.');
                    }

                    /* Log */
                    let logDBType = dbMembers.DBType.SERVER;
                    let logContentType = dbMembers.ContentType.REQUEST_LOG;
                    let logInputType = dbMembers.InputType.CREATE;

                    console.log('logDBType', logDBType);
                    console.log('logContentType', logContentType);
                    console.log('logInputType', logInputType)


                    let logQueryObject = dbQueries[logDBType][logContentType][logInputType]();

                    let logDB = dbMembers.logDB;
                    let logQuery = logQueryObject.query.shift();
                    let logValues = logQueryObject.values.shift();
                    // let serverErrorMessage = serverQueryObject.errorMessage.shift();

                    logResults.push(await logDB(logQuery, logValues));

                    if (logResults[logResults.length - 1].errno) {
                        // console.log('[ Log Result ]');
                        // console.log(logResults);
                        // console.log('[ Log Query ]');
                        // console.log(logQueryObject.query);
                        // console.log('[ Log Values ]');
                        // console.log(logQueryObject.values);
                        throw new Error('[Error] run() : There might be an error in query syntax on \'server DB\'.');
                    }
                    console.log('[ Request Results ]');
                    console.log(requestResults);
                    console.log('=============== DB FINISH ===============')
                }
            }
            if (requestResults.length === 1) {
                return requestResults[0];
            } else {
                return requestResults;
            }
        })();
    }
    return {
        /* InputType: InputType,
        ContentType: ContentType, */
        run: run
    }
})();

module.exports = {
    run(req, res) {
        (async function () {
            res.send({
                result: await DBOperator.run(req)
            });
        })();
    }
}