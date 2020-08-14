const ilog = require('../server/module/improvedConsoleLog')

module.exports = async function (req, res) {
    const dbMembers = require('./db/dbMembers')(req, res);

    let DBType = dbMembers.DBType;
    let ContentType = dbMembers.ContentType;

    let dbType = dbMembers.dbType;
    let contentType = dbMembers.contentType;

    let requestLinker = {
        [DBType.USER]: {
            [ContentType.ACCOUNT]: require('./db/queries/user/account')
        },
        [DBType.BLOG]: {
            [ContentType.POST]: require('./db/queries/blog/post'),
            [ContentType.CATEGORY_EDITOR]: require('./db/queries/blog/categoryEditor'),
            [ContentType.CATEGORY]: require('./db/queries/blog/category'),
            [ContentType.SECTION]: require('./db/queries/blog/section'),
        },
        [DBType.SERVER]: {
            [ContentType.REQUEST_LOG]: require('./db/queries/server/requestLog')
        }
    }

    ilog.all({ dbType: dbType })
    let requestResult = await requestLinker[dbType][contentType](dbMembers);
    requestLinker[DBType.SERVER][ContentType.REQUEST_LOG](dbMembers);


    res.send({result: requestResult}).redirect('./src/client/auth/login.html');
}