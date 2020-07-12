const dbMembers = require('./DBmembers');

const DBOperator = (function () {
    function init(req) {
        /* RequestObject */
        if (req === null) {
            throw new Error('[Error] init() : Parameter \'req\' is null.');
        }
        dbMembers.requestObject = req;

        /* typeObject */
        let requestPath = req.route.path;
        dbMembers.typeObject = {
            inputType: (function () {
                let inputPart = requestPath.split('/')[1].split(/[A-Z]/)[0];
                return inputPart;
            })(),
            contentType: (function () {
                let contentPart = requestPath.split(/\/[a-z]+/)[1];
                let firstLetter = contentPart.charAt(0);
                let camelCase = contentPart.replace(firstLetter, firstLetter.toLowerCase());
                return camelCase;
            })()
        }

        function isVerifiedType(typeObject, value) {
            let verified = false;
            for (const key in typeObject) {
                if (typeObject[key] === value) {
                    verified = true;
                    return verified;
                }
            }
            return verified;
        }
        if (!isVerifiedType(dbMembers.InputType, dbMembers.typeObject.inputType)) {
            throw new Error('[Error] init() : Parameter \'inputType\' is wrong.');
        };
        if (!isVerifiedType(dbMembers.ContentType, dbMembers.typeObject.contentType)) {
            throw new Error('[Error] init() : Parameter \'contentType\' is wrong.');
        };
    }

    function run(req) {
        return (async () => {
            init(req);
            let queryObject = require('./DBQueries')(dbMembers).queryObject;

            let blogContentType = dbMembers.typeObject.contentType;
            let blogInputType = dbMembers.typeObject.inputType;
            let dbType = dbMembers.DBType.BLOG;

            let blogQueryObject = queryObject.blog[blogContentType][blogInputType]();
            let queryLength = queryObject.getResultLength(dbType);

            let serverResult = [];
            let blogResult = [];
            for (let procedureId = 0; procedureId < queryLength; procedureId++) {
                console.log('=============== DB RUN ===============')
                console.log('[procedureId]', procedureId)
                // console.log('[ Content Type ]');
                // console.log(blogContentType);
                // console.log('[ Input Type ]');
                // console.log(blogInputType);

                let blogQuery = blogQueryObject.query.shift();
                let blogValues = blogQueryObject.values.shift();
                let blogErrorMessage = blogQueryObject.errorMessage.shift();

                if (blogErrorMessage) {
                    return blogQueryObject.errorMessage;
                } else {
                    const DB = dbMembers.DB;

                    /* Server */
                    let serverContentType = dbMembers.ContentType.REQUEST_LOG;
                    let serverInputType = dbMembers.InputType.CREATE;
                    let serverQueryObject = queryObject.server[serverContentType][serverInputType]();

                    let serverQuery = serverQueryObject.query.shift();
                    let serverValues = serverQueryObject.values.shift();
                    let serverErrorMessage = serverQueryObject.errorMessage.shift();

                    serverResult.push(await DB.server(serverQuery, serverValues));

                    /* Blog */
                    blogResult.push(await DB.blog(blogQuery, blogValues));

                    if (blogResult[blogResult.length - 1].errno) {
                        // console.log('[ Blog Result ]');
                        // console.log(blogResult);
                        // console.log('[ Blog Query ]');
                        // console.log(blogQueryObject.query);
                        // console.log('[ Blog Values ]');
                        // console.log(blogQueryObject.values);
                        throw new Error('[Error] run() : There might be an error in query syntax on \'blog DB\'.');
                    }
                    if (serverResult[serverResult.length - 1].errno) {
                        // console.log('[ Server Result ]');
                        // console.log(serverResult);
                        // console.log('[ Server Query ]');
                        // console.log(serverQueryObject.query);
                        // console.log('[ Server Values ]');
                        // console.log(serverQueryObject.values);
                        throw new Error('[Error] run() : There might be an error in query syntax on \'server DB\'.');
                    }
                    console.log('[ blogResult ]');
                    console.log(blogResult);
                    console.log('=============== DB RUN ===============')
                }
            }
            if (blogResult.length === 1) {
                return blogResult[0];
            } else {
                return blogResult;
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