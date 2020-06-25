module.exports = (function () {
    /* st-mysql */
    const DB = {
        blog: require('st-mysql')({
            host: 'localhost', user: 'root', password: '1135', database: 'blog', flat: true, encode: false
        }),
        server: require('st-mysql')({
            host: 'localhost', user: 'root', password: '1135', database: 'server', flat: true, encode: false
        })
    }
    const InputType = {
        CREATE: 'create',
        READ: 'read',
        UPDATE: 'update',
        DELETE: 'delete'
    }
    const ContentType = {
        POST: 'post',
        POST_LIST: 'postList',
        CATEGORY: 'category'
    }

    let dbObject;
    let requestObject;
    let contentValue;
    let blogQueryObject = {
        query: null,
        values: null,
        errorMessage: null
    };
    let serverQueryObject = {
        query: null,
        values: null,
        errorMessage: null
    }

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



    const queryObject = {
        blog: {
            post: {
                create() {
                    if (dbObject.blog.post.title.length === 0) {
                        blogQueryObject.errorMessage = 'There is no title.';
                    } else if (dbObject.blog.post.author.length === 0) {
                        blogQueryObject.errorMessage = 'There is no author.';
                    } else if (dbObject.blog.post.description.length === 0) {
                        blogQueryObject.errorMessage = 'There is no description.';
                    } else {
                        blogQueryObject.query =
                            `INSERT INTO Post (title, author, description, view_count, comment_count, category_id) VALUES (?, ?, ?, ?, ?, ?);`;
                        blogQueryObject.values = [
                            dbObject.blog.title,
                            dbObject.blog.author,
                            dbObject.blog.description,
                            dbObject.blog.view_count,
                            dbObject.blog.comment_count,
                            dbObject.blog.category
                        ];
                    }
                    return blogQueryObject;
                },
                read() {
                    let post_id = requestObject.query.post_id;
                    queryObject.query = `SELECT post_id, category, title, author, description, view_count, time FROM Post WHERE post_id=?`;
                    queryObject.values = [
                        post_id
                    ];
                    return queryObject;
                },
                update() {
                    let post_id = requestObject.body.post_id;

                    if (dbObject.blog.title.length === 0) {
                        queryObject.errorMessage = 'There is no title.';
                    } else if (dbObject.blog.author.length === 0) {
                        queryObject.errorMessage = 'There is no author.';
                    } else if (dbObject.blog.description.length === 0) {
                        queryObject.errorMessage = 'There is no description.';
                    } else {
                        queryObject.query = 'UPDATE Post SET title=?, author=?, description=?  WHERE post_id=?';
                        queryObject.values = [
                            dbObject.blog.title,
                            dbObject.blog.author,
                            dbObject.blog.description,
                            post_id
                        ];
                    }
                    return queryObject;
                },
                delete() {
                    let post_id = requestObject.body.post_id;
                    queryObject.query = 'DELETE FROM Post WHERE post_id=?';
                    queryObject.values = [
                        post_id
                    ];
                    return queryObject;
                }
            },
            category: {
                create() {
                    /* let startPage = 1;
                    let loadAmount = 100;
                    let startIndex = (startPage - 1) * loadAmount;
                    let endIndex = (startPage * loadAmount) - 1;
                    queryObject.query =
                        `SELECT post_id, category, title, author, view_count, comment_count, time FROM Post ORDER BY post_id DESC LIMIT ?, ?`;
                    queryObject.values = [
                        startIndex,
                        endIndex
                    ]
                    return queryObject; */
                },
                read() {

                },
                update() {

                },
                delete() {

                }
            },
            section: {
                create() {

                },
                read() {

                },
                update() {

                },
                delete() {

                }
            }
        },
        server: {
            request_log: {
                create() {
                    serverQueryObject.query =
                        `INSERT INTO Log (type, method, ip_address, url, request_body) VALUES (?, ?, ?, ?, ?);`;
                    serverQueryObject.serverValues = [
                        dbObject.request_log.type,
                        dbObject.request_log.method,
                        dbObject.request_log.ip_address,
                        dbObject.request_log.url,
                        dbObject.request_log.request_body
                    ];
                    return serverQueryObject;
                },
                read() {

                },
                update() {

                },
                delete() {

                }
            }
        }
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

        dbObject = {
            blog: {
                post: {
                    title: req.body.title,
                    author: req.body.author,
                    description: req.body.description,
                    view_count: 0,
                    comment_count: 0,
                    category_id: null
                },
                category: {
                    name: '',
                    section_id: null
                },
                section: {
                    name: '',
                    section_id: null
                }
            },
            server: {
                request_log: {
                    type: inputType,
                    method: req.method === 'GET' ? 'get' : 'post',
                    ip_address: req.headers['x-forwarded-for'],
                    url: req.originalUrl,
                    body: JSON.stringify(req.body)
                }
            }
        }
        requestObject = req;
        contentValue = contentType;
    }
    
    function run() {
        return (async () => {
            let { blogQuery, blogValues, blogErrorMessage } = queryObject['blog'].post[dbObject.server.type]();
            if (blogErrorMessage) {
                return queryObject.errorMessage;
            } else {
                /* Server */
                let { serverQuery, serverValues, serverErrorMessage } = queryObject['server'].post[dbObject.server.type]()
                let serverResult = await DB.server(serverQuery, serverValues);

                /* Blog */
                let blogResult = await DB.blog(blogQuery, blogValues);

                if (blogResult.errono) {
                    throw new Error('[Error] run() : There might be an error in query syntax on blog DB.');
                }
                if (blogResult.errono) {
                    throw new Error('[Error] run() : There might be an error in query syntax on server DB.');
                }
                return blogResult;
            }
        })();
    }

    return {
        InputType: InputType,
        ContentType: ContentType,
        init: init,
        run: run,
    }
})();