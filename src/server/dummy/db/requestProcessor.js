const ilog = require('../module/improvedConsoleLog')

module.exports = async function (req, res) {
    const dbMembers = require('./dbMembers')(req, res);

    let DBType = dbMembers.DBType;
    let ContentType = dbMembers.ContentType;

    let dbType = dbMembers.dbType;
    let contentType = dbMembers.contentType;

    let requestLinker = {
        [DBType.USER]: {
            [ContentType.ACCOUNT]: require('./queries/user/account')
        },
        [DBType.BLOG]: {
            [ContentType.POST]: require('./queries/blog/post'),
            [ContentType.CATEGORY_EDITOR]: require('./queries/blog/categoryEditor'),
            [ContentType.CATEGORY]: require('./queries/blog/category'),
            [ContentType.SECTION]: require('./queries/blog/section'),
        },
        [DBType.SERVER]: {
            [ContentType.REQUEST_LOG]: require('./queries/server/requestLog')
        }
    }

    ilog.all({ dbType: dbType })
    let reponseObject = await requestLinker[dbType][contentType](dbMembers);
    requestLinker[DBType.SERVER][ContentType.REQUEST_LOG](dbMembers);
    ilog.all({reponseObject, reponseObject});

    res.send(reponseObject);
}