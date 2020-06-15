const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/post', express.static('./src'));

app.get('/', function (req, res) {
    if (req.headers['x-forwarded-proto' === 'http']) {
        res.redirect(301, 'https://basalcode.space');
    } else {
        fs.readFile('./src/blogMain.html', function (err, data) {
            if (err) {
                res.status(404).send('Not Found');
            } else {
                res.status(200).send(data.toString());
            }
        })
    }
})

let DBOperator = (function () {
    /* st-mysql */
    const DB = {
        blog: require('st-mysql')({
            host: 'localhost', user: 'root', password: '1135', database: 'Blog', flat: true, encode: false
        }),
        server: serverDB = require('st-mysql')({
            host: 'localhost', user: 'root', password: '1135', database: 'Server', flat: true, encode: false
        })
    }

    const InputType = {
        CREATE: 'C',
        READ: 'R',
        UPDATE: 'U',
        DELETE: 'D'
    }
    const ContentType = {
        POST: 'post',
        POST_LIST: 'postList'
    }

    let dbParamsObj;
    let contentValue;
    let responseObj;

    function isVerifiedType(obj, type) {
        let verified = false;
        for (const key in obj) {
            if (obj[key] === type) {
                verified = true;
                return verified;
            }
        }
        return verified;
    }

    function init(req, inputType, contentType) {
        if (req === null) {
            throw new Error('[Error] init() : Parameter \'req\' is null.');
        }

        if (!isVerifiedType(InputType, inputType)) {
            throw new Error('[Error] init() : Parameter \'inputType\' is wrong.');
        };

        if (!isVerifiedType(ContentType, contentType)) {
            throw new Error('[Error] init() : Parameter \'contentType\' is wrong.');
        };

        dbParamsObj = {
            blog: {
                category: 'noName',
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                view_count: 0,
                comment_count: 0
            },
            server: {
                ip_address: req.headers['x-forwarded-for'],
                is_get: req.method === 'GET' ? true : false,
                CRUD: inputType,
                request_url: req.originalUrl,
                request_query: JSON.stringify(req.query),
                request_body: JSON.stringify(req.body),
                response_obj: JSON.stringify(responseObj)
            }
        };
        contentValue = contentType;
    }

    function getCreateQueryObj() {
        let queryObject;
        switch (contentValue) {
            case ContentType.POST:
                queryObject.query = 
                        `INSERT INTO Post (category, title, author, description, view_count, comment_count) VALUES (?, ?, ?, ?, ?, ?);`;
                queryObject.values = [
                    dbParamsObj.server.ip_address,
                    dbParamsObj.server.is_get,
                    dbParamsObj.server.CRUD,
                    dbParamsObj.server.request_url,
                    dbParamsObj.server.request_query,
                    dbParamsObj.server.request_body,
                    dbParamsObj.server.response_obj
                ];
                break;
            /* case ContentType.POST_LIST:
                break; */
            default:
                throw new Error('[Error] getCreateQueryObj() : Type Error');
        }
        return queryObject;
    }

    function getReadQueryObj() {
        let queryObject = {};
        switch (contentValue) {
            /* case ContentType.POST:
                break; */
            case ContentType.POST_LIST:
                let startPage = 1;
                let loadAmount = 100;
                let startIndex = (startPage - 1) * loadAmount;
                let endIndex = (startPage * loadAmount) - 1;

                queryObject.query = 
                    `SELECT category, title, author, description, view_count, comment_count, time FROM Post ORDER BY post_id DESC LIMIT ${startIndex}, ${endIndex}`;
                queryObject.values = null
                break;
            default:
                throw new Error('[Error] getCreateQueryObj() : Type Error');
        }
        return queryObject;
    }

    function getUpdateQueryObj() {
        let queryObject = {};
        switch (contentValue) {
            /* case ContentType.POST:
                break; */
            case ContentType.POST_LIST:
                queryObject.query = 
                    `SELECT category, title, author, description, view_count, comment_count, time FROM Post ORDER BY post_id DESC LIMIT ${startIndex}, ${endIndex}`;
                queryObject.values = null
                break;
            default:
                throw new Error('[Error] getCreateQueryObj() : Type Error');
        }
        return queryObject;
    }

    function getDeleteQueryObj() {
        let queryObject = {};
        switch (contentValue) {
            /* case ContentType.POST:
                break; */
            /* case ContentType.POST_LIST:
                break; */
            default:
                throw new Error('[Error] getCreateQueryObj() : Type Error');
        }
        return queryObject;
    }

    function setQuery() {
        let queryObject = {};
        switch (dbParamsObj.server.CRUD) {
            case InputType.CREATE:
                queryObject = getCreateQueryObj();
                break;
            case InputType.READ:
                queryObject = getReadQueryObj();
                break;
            case InputType.UPDATE:
                queryObject = getUpdateQueryObj();
                break;
            case InputType.DELETE:
                queryObject = getDeleteQueryObj();
                break;
            default:
                throw new Error('[Error] setQuery() : Type Error');
        }
        return queryObject;
    }

    function log() {
        return (async () => {
            let serverQuery = 
                `INSERT INTO Log (ip_address, is_get, CRUD, request_url, request_query, request_body, response_obj) VALUES (?, ?, ?, ?, ?, ?, ?);`;
            let serverValues = [
                dbParamsObj.server.ip_address,
                dbParamsObj.server.is_get,
                dbParamsObj.server.CRUD,
                dbParamsObj.server.request_url,
                dbParamsObj.server.request_query,
                dbParamsObj.server.request_body,
                dbParamsObj.server.response_obj
            ];
            return await DB.server(serverQuery, serverValues);
        })();
    }

    function run() {
        return (async () => {
            let queryObj = setQuery();
            let [query, values] = [queryObj.query, queryObj.values];
            
            responseObj = await DB.blog(query, values);
            await log();

            return responseObj;
        })();
    }
    
    return {
        InputType: InputType,
        ContentType: ContentType,
        init: init,
        run: run,
    }
})();

/* app.get ('/test', function (req, res) {
    let db1 = DBOperator().init('Hello');
    let db2 = DBOperator().init('New Obj');

    res.send({
        db2: db2.value,
        db1: db1.value
    });
}) */

app.post('/writePost', function (req, res) {
    (async () => {
        DBOperator.init(
            req,
            DBOperator.InputType.CREATE,
            DBOperator.ContentType.POST
        );

        res.send({
            result: await DBOperator.run()
        });
    })();
})

app.get('/readPostList', function (req, res) {
    (async () => {
        DBOperator.init(
            req,
            DBOperator.InputType.READ,
            DBOperator.ContentType.POST_LIST
        );

        res.send({
            result: await DBOperator.run()
        });
    })();
})

app.listen(3000);