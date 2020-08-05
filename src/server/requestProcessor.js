const dbOperator = require('./db/dbOperator');
const sessionOperator = require('./session/sessionOperator');
const ilog = require('../server/module/improvedConsoleLog')

module.exports = function (req, res) {
    (async function () {
        const SessionType = {
            ONLY: 'alone',
            FRONT: 'front',
            BOTH: 'both',
            BACK: 'back'
        }

        let originalURL = req.originalUrl;
        let sessionParams = req.params.session;
        if (sessionParams) {
            if (Object.values(SessionType).indexOf(sessionParams) === -1) {
                throw new Error(`[Error] requestProcessor.js: Invalid \'SessionType\' value. in \'sessionParams\'.`);
            }
        }
        
        ilog.all({originalURL: originalURL});
        ilog.all({sessionParams: sessionParams});

        let requestResult;
        if (originalURL.split('/')[1] === SessionType.ONLY) { // Only Session
            console.log('Only Session');

            requestResult = sessionOperator(req);
        } else if (sessionParams === SessionType.FRONT) { // Session => DB
            console.log('Session => DB');

            let frontSession = sessionOperator(req);
            requestResult = await dbOperator(req, frontSession);
        } else if (sessionParams === SessionType.BOTH) { // Session => DB => Session
            console.log('Session => DB => Session');

            let frontSession = sessionOperator.run(req);
            let db = await dbOperator(req, frontSession);
            requestResult = sessionOperator(req, db);
        } else if (sessionParams === SessionType.BACK) { // DB => Session
            console.log('DB => Session');

            let db = await dbOperator(req);
            requestResult = sessionOperator(req, db);
        } else { // Only DB
            console.log('Only DB');

            requestResult = await dbOperator(req);
        }
        ilog.all({requestResult: requestResult});

        res.send({
            result: requestResult
        });
    })();
}
