module.exports = function (request) {
    if (!request) {
        throw new Error('[Error] DBmembers.js: There is no \'request\' parameter on DBmembers.js.');
    }

    /* types */
    const DBType = {
        USER: 'user',
        BLOG: 'blog',
        SERVER: 'server'
    }
    const ContentType = {
        ACOUNT: 'account',
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

    let dbType = request.params.db;
    let inputType = request.params.inputType;
    let contentType = request.params.contentType;

    isValid(DBType, dbType);
    isValid(ContentType, contentType);
    isValid(InputType, inputType);

    function isValid(typeConstant, typeParameter) {
        if (!typeConstant) {
            throw new Error(`[Error] isValid(): Undefined \'typeConstant\' parameter.`);
        }
        if (!typeParameter) {
            throw new Error(`[Error] isValid(): Undefined \'typeParameter\' parameter.`);
        }

        if (Object.values(typeConstant).indexOf(typeParameter) === -1) {
            throw new Error(`[Error] isValid(): Invalid \'${typeConstant.name}\' value has been detected on \'DBmembers.js.\'`);
        }
        if (typeConstant === ContentType) {
            (function isContentTypeValid() {
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
                    throw new Error(`[Error] isContentTypeValid(): Unrelated 
                    DB and content.`);
                }
            })();
        }
    }

    /* st-mysql */
    const DB = {
        user: require('st-mysql')({
            host: 'localhost', user: 'root', password: '1135', database: 'user', flat: true, encode: false
        }),
        blog: require('st-mysql')({
            host: 'localhost', user: 'root', password: '1135', database: 'blog', flat: true, encode: false
        }),
        server: require('st-mysql')({
            host: 'localhost', user: 'root', password: '1135', database: 'server', flat: true, encode: false
        })
    }
    let targetDB = DB[dbType];
    let logDB = DB[DBType.SERVER];

    return {
        requestObject: request,

        DBType: DBType,
        ContentType: ContentType,
        InputType: InputType,

        dbType: dbType,
        inputType: inputType,
        contentType: contentType,

        targetDB: targetDB,
        logDB: logDB
    }
}