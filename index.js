const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

/* st-mysql */
const blogDB = require('st-mysql')({
    host: 'localhost', user: 'root', password: '1135', database: 'Blog', flat: true, encode: false
});
const serverDB = require('st-mysql')({
    host: 'localhost', user: 'root', password: '1135', database: 'Server', flat: true, encode: false
});

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

let DBOperator = function () {
    let value;
    function init(value) {
        this.value = value;
        return this;
    }

    return {
        init: init,
        value: this.value
    }
};

/* app.get ('/test', function (req, res) {
    let db1 = DBOperator().init('Hello');
    let db2 = DBOperator().init('New Obj');
    res.send({
        db2: db2.value,
        db1: db1.value
    });
})
 */
app.post('/writePost', function (req, res) {
    (async () => {
        const Type = {
            CREATE: 'c',
            READ: 'r',
            UPDATE: 'u',
            DELETE: 'd'
        }

        // Blog
        let viewCount = 1;
        let commentCount = 2;
        
        // Server
        let is_get = req.method === 'GET' ? true : false;
        let inputType = Type.CREATE;
        let responseObj = {};
        let dbParamsObj = {
            blog: {
                category: 'noName',
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                view_count: viewCount,
                comment_count: commentCount
            },
            server: {
                ip_address: req.headers['x-forwarded-for'],
                is_get: is_get,
                CRUD: inputType,
                request_url: req.originalUrl,
                request_query: JSON.stringify(req.query),
                request_body: JSON.stringify(req.body),
                response_obj: JSON.stringify(responseObj)
            }
        }

        let blogQeury = `INSERT INTO Post (category, title, author, description, view_count, comment_count) VALUES (?, ?, ?, ?, ?, ?);`;
        let blogValues = [
            dbParamsObj.blog.category,
            dbParamsObj.blog.title,
            dbParamsObj.blog.author,
            dbParamsObj.blog.description,
            dbParamsObj.blog.view_count,
            dbParamsObj.blog.comment_count
        ];

        let serverQuery = `INSERT INTO Log (ip_address, is_get, CRUD, request_url, request_query, request_body, response_obj) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        let serverValues = [
            dbParamsObj.server.ip_address,
            dbParamsObj.server.is_get,
            dbParamsObj.server.CRUD,
            dbParamsObj.server.request_url,
            dbParamsObj.server.request_query,
            dbParamsObj.server.request_body,
            dbParamsObj.server.response_obj
        ];

        let blog = await blogDB(blogQeury, blogValues);
        let server = await serverDB(serverQuery, serverValues);

        res.send({
            blog: blog,
            server: server
        });
    })();
})

app.get('/readPostList', function (req, res) {
    (async () => {
        let startPage = 1;
        let loadAmount = 100;
        let startIndex = (startPage - 1) * loadAmount;
        let endIndex = (startPage * loadAmount) - 1;

        const Type = {
            CREATE: 'c',
            READ: 'r',
            UPDATE: 'u',
            DELETE: 'd'
        }

        // Blog
        let viewCount = 1;
        let commentCount = 2;
        
        // Server
        let is_get = req.method === 'GET' ? true : false;
        let inputType = Type.CREATE;
        let responseObj = {};
        let dbParamsObj = {
            blog: {
                category: 'noName',
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                view_count: viewCount,
                comment_count: commentCount
            },
            server: {
                ip_address: req.headers['x-forwarded-for'],
                is_get: is_get,
                CRUD: inputType,
                request_url: req.originalUrl,
                request_query: JSON.stringify(req.query),
                request_body: JSON.stringify(req.body),
                response_obj: JSON.stringify(responseObj)
            }
        }

        let blogQeury = `SELECT category, title, author, description, view_count, comment_count, time FROM Post ORDER BY post_id DESC LIMIT ${startIndex}, ${endIndex}`

        let serverQuery = `INSERT INTO Log (ip_address, is_get, CRUD, request_url, request_query, request_body, response_obj) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        let serverValues = [
            dbParamsObj.server.ip_address,
            dbParamsObj.server.is_get,
            dbParamsObj.server.CRUD,
            dbParamsObj.server.request_url,
            dbParamsObj.server.request_query,
            dbParamsObj.server.request_body,
            dbParamsObj.server.response_obj
        ];

        let blog = await blogDB(blogQeury);
        let server = await serverDB(serverQuery, serverValues);

        res.send({
            blog: blog,
            server: server
        });
    })();
})

app.listen(3000);