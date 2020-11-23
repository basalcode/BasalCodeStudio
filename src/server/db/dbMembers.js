const privateDB = require('../../../.private/security/db');

const ilog = require('../module/improvedConsoleLog');

module.exports = function (request, response) {
    if (!request) {
        throw new Error('[Error] DBmembers.js: There is no \'request\' parameter on DBmembers.js.');
    }

    if (!response) {
        throw new Error('[Error] DBmembers.js: There is no \'response\' parameter on DBmembers.js.');
    }

    /* types */
    const DBType = {
        USER: 'user',
        BLOG: 'blog',
        SERVER: 'server'
    }
    const ContentType = {
        ACCOUNT: 'account',
        POST: 'post',
        CATEGORY_EDITOR: 'categoryEditor',
        CATEGORY: 'category',
        SECTION: 'section',
        REQUEST_LOG: 'requestLog'
    }
    const InputType = {
        CREATE: 'create',
        READ: 'read',
        UPDATE: 'update',
        DELETE: 'delete'
    }

    let requestObject = request;
    let responseObject = response;

    let dbType = request.params.dbType;
    let contentType = request.params.contentType;
    let inputType = request.params.inputType;

    verify(DBType, dbType);
    verify(ContentType, contentType);
    verify(InputType, inputType);

    /* st-mysql */
    const DB = {
        user: require('st-mysql')({
            host: 'localhost', 
            user: privateDB.mysqlUser, 
            password: privateDB.mysqlPassword, 
            database: privateDB.databaseName.user, 
            flat: true, 
            encode: false
        }),
        blog: require('st-mysql')({
            host: 'localhost', 
            user: privateDB.mysqlUser, 
            password: privateDB.mysqlPassword, 
            database: privateDB.databaseName.blog, 
            flat: true, 
            encode: false
        }),
        server: require('st-mysql')({
            host: 'localhost', 
            user: privateDB.mysqlUser, 
            password: privateDB.mysqlPassword, 
            database: privateDB.databaseName.server,
            flat: true, 
            encode: false
        })
    }
    
    let requestDB = DB[dbType];
    let logDB = DB[DBType.SERVER];

    function verify(typeConstant, typeParameter) {
        if (!typeConstant) {
            throw new Error(`[Error] verify(): Undefined \'typeConstant\' parameter.`);
        }
        if (!typeParameter) {
            throw new Error(`[Error] verify(): Undefined \'typeParameter\' parameter.`);
        }
        if (Object.values(typeConstant).indexOf(typeParameter) === -1) {
            throw new Error(`[Error] verify(): Invalid \'${typeConstant.name}\' value has been detected on \'DBmembers.js.\'`);
        }
        if (typeConstant === ContentType) {
            (function verifyContentType() {
                const Relation = {
                    [DBType.USER]: {
                        [ContentType.ACCOUNT]: 1
                    },
                    [DBType.BLOG]: {
                        [ContentType.POST]: 1,
                        [ContentType.CATEGORY_EDITOR]: 2,
                        [ContentType.CATEGORY]: 3,
                        [ContentType.SECTION]: 4
                    },
                    [DBType.SERVER]: {
                        [ContentType.REQUEST_LOG]: 1
                    }
                }
                if (!Relation[dbType][contentType]) {
                    throw new Error(`[Error] verifyContentType(): Unrelated 
                    DB and content.`);
                }
            })();
        }
    }

    return {
        DBType: DBType,
        ContentType: ContentType,
        InputType: InputType,

        requestObject: requestObject,
        responseObject: responseObject,

        dbType: dbType,
        inputType: inputType,
        contentType: contentType,

        requestDB: requestDB,
        logDB: logDB
    }
};