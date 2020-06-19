const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/source', express.static('./src'));

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
    let requestObj;
    let contentValue;

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
                request_body: JSON.stringify(req.body)
            }
        };

        requestObj = req;
        contentValue = contentType;
    }

    function getCreateQueryObj() {
        let queryObject = {
            query: null,
            values: null
        };
        switch (contentValue) {
            case ContentType.POST:
                queryObject.query = 
                        `INSERT INTO Post (category, title, author, description, view_count, comment_count) VALUES (?, ?, ?, ?, ?, ?);`;
                queryObject.values = [
                    dbParamsObj.blog.category,
                    dbParamsObj.blog.title,
                    dbParamsObj.blog.author,
                    dbParamsObj.blog.description,
                    dbParamsObj.blog.view_count,
                    dbParamsObj.blog.comment_count
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
        let queryObject = {
            query: null,
            values: null
        };
        switch (contentValue) {
            case ContentType.POST:
                let post_id = requestObj.query.post_id;
                queryObject.query = `SELECT post_id, category, title, author, description, view_count, time FROM Post WHERE post_id=?`;
                queryObject.values = [
                    post_id
                ];
                break;
            case ContentType.POST_LIST:
                let startPage = 1;
                let loadAmount = 100;
                let startIndex = (startPage - 1) * loadAmount;
                let endIndex = (startPage * loadAmount) - 1;

                queryObject.query = 
                    `SELECT post_id, category, title, author, description, view_count, comment_count, time FROM Post ORDER BY post_id DESC LIMIT ?, ?`;
                queryObject.values = [
                    startIndex,
                    endIndex
                ]
                break;
            default:
                throw new Error('[Error] getCreateQueryObj() : Type Error');
        }
        return queryObject;
    }

    function getUpdateQueryObj() {
        let queryObject = {
            query: null,
            values: null
        };
        switch (contentValue) {
            case ContentType.POST:
                let post_id = requestObj.body.post_id;
                queryObject.query = 'UPDATE Post SET title=?, author=?, description=?  WHERE post_id=?';
                queryObject.values = [
                    dbParamsObj.blog.title,
                    dbParamsObj.blog.author,
                    dbParamsObj.blog.description,
                    post_id
                ];
                break;
            /* case ContentType.POST_LIST:
                break; */
            default:
                throw new Error('[Error] getCreateQueryObj() : Type Error');
        }
        return queryObject;
    }

    function getDeleteQueryObj() {
        let queryObject = {
            query: null,
            values: null
        };
        switch (contentValue) {
            case ContentType.POST:
                let post_id = requestObj.body.post_id;
                queryObject.query = 'DELETE FROM Post WHERE post_id=?';
                queryObject.values = [
                    post_id
                ];
                break;
            /* case ContentType.POST_LIST:
                break; */
            default:
                throw new Error('[Error] getCreateQueryObj() : Type Error');
        }
        return queryObject;
    }

    function setQuery() {
        let queryObject;
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
                `INSERT INTO Log (ip_address, is_get, CRUD, request_url, request_query, request_body) VALUES (?, ?, ?, ?, ?, ?);`;
            let serverValues = [
                dbParamsObj.server.ip_address,
                dbParamsObj.server.is_get,
                dbParamsObj.server.CRUD,
                dbParamsObj.server.request_url,
                dbParamsObj.server.request_query,
                dbParamsObj.server.request_body
            ];
            return await DB.server(serverQuery, serverValues);
        })();
    }

    function run() {
        return (async () => {
            let queryObj = setQuery();
            let [query, values] = [queryObj.query, queryObj.values];
            
            let blogResult = await DB.blog(query, values);
            let serverResult = await log();

            if (blogResult.errono !== undefined) {
                throw new Error('[Error] run() : There might be an error in query syntax');
            }
            if (serverResult.errono !== undefined) {
                throw new Error('[Error] run() : There might be an error in query syntax');
            }
            return blogResult;
        })();
    }
    
    return {
        InputType: InputType,
        ContentType: ContentType,
        init: init,
        run: run,
    }
})();

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

app.get('/readPost', function (req, res) {
    (async () => {
        DBOperator.init(
            req,
            DBOperator.InputType.READ,
            DBOperator.ContentType.POST
        );

        res.send({
            result: await DBOperator.run()
        })
    })();
})

app.post('/updatePost', function (req, res) {
    console.log(req.body);
    (async () => {
        DBOperator.init(
            req,
            DBOperator.InputType.UPDATE,
            DBOperator.ContentType.POST
        );

        res.send({
            result: await DBOperator.run()
        })
    })();
})

app.post('/deletePost', function (req, res) {
    (async () => {
        DBOperator.init(
            req,
            DBOperator.InputType.DELETE,
            DBOperator.ContentType.POST
        );

        res.send({
            result: await DBOperator.run()
        })
    })();
})

app.listen(3000);