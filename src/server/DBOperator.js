const { request } = require('express');
const e = require('express');

const DB = (function () {
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
        CATEGORY_EDITOR: 'categoryEditor',
        CATEGORY: 'category',
        SECTION: 'section',
        REQUEST_LOG: 'requestLog'
    }
    let requestObject;
    let typeObject;

    const queryObject = {
        blog: {
            result: {
                query: null,
                values: null,
                errorMessage: null
            },
            [ContentType.POST]: {
                create() {
                    if (requestObject.body.title.length === 0) {
                        queryObject.blog.result.errorMessage = 'There is no title.';
                    } else if (requestObject.body.author.length === 0) {
                        queryObject.blog.result.errorMessage = 'There is no author.';
                    } else if (requestObject.body.description.length === 0) {
                        queryObject.blog.result.errorMessage = 'There is no description.';
                    } else {
                        queryObject.blog.result.query = `
                            INSERT INTO post (
                                title,
                                author,
                                description
                            ) 
                            VALUES (?, ?, ?);
                        `;
                        queryObject.blog.result.values = [
                            requestObject.body.title,
                            requestObject.body.author,
                            requestObject.body.description
                        ];
                    }
                    return queryObject.blog.result;
                },
                read() {
                    let post_id = requestObject.query.post;
                    console.log(post_id);
                    queryObject.blog.result.query = `
                        SELECT
                            id,
                            category_id,
                            title,
                            author,
                            view_count,
                            time,
                            description
                        FROM post
                        WHERE id = ?
                    `;
                    queryObject.blog.result.values = [
                        post_id
                    ];
                    return queryObject.blog.result;
                },
                update() {
                    let post_id = requestObject.body.post;
                    if (requestObject.body.title.length === 0) {
                        queryObject.blog.result.errorMessage = 'There is no title.';
                    } else if (requestObject.body.author.length === 0) {
                        queryObject.blog.result.errorMessage = 'There is no author.';
                    } else if (requestObject.body.description.length === 0) {
                        queryObject.blog.result.errorMessage = 'There is no description.';
                    } else {
                        queryObject.blog.result.query = `
                            UPDATE post 
                            SET 
                                title=?, 
                                author=?, 
                                description=? 
                            WHERE id=?;
                        `;
                        queryObject.blog.result.values = [
                            requestObject.body.title,
                            requestObject.body.author,
                            requestObject.body.description,
                            requestObject.body.post_id
                        ];
                    }
                    return queryObject.blog.result;
                },
                delete() {
                    let post_id = requestObject.body.post;
                    queryObject.blog.result.query = `
                        DELETE FROM post 
                        WHERE id=?
                    `;
                    queryObject.blog.result.values = [
                        post_id
                    ];
                    return queryObject.blog.result;
                }
            },
            [ContentType.CATEGORY_EDITOR]: {
                read() {
                    queryObject.blog.result.query = `
                        SELECT 
                            section.id AS section_id,
                            section.name AS section_name,
                            section.order AS section_order,
                            category.id AS category_id,
                            category.name AS category_name,
                            category.order AS category_order
                        FROM section
                        RIGHT JOIN category
                        ON section.id = category.section_id
                        ORDER BY section_order ASC, category_order ASC
                        ;
                    `;
                    queryObject.blog.result.values = null;
                    return queryObject.blog.result;
                },
                async update() {
                    const LENGTH_VALUE = 1;
                    const DEFAULT_INDEX = 0;
                    const AFTER_DEFAULT = 1;

                    let requestBody = requestObject.body;
                    let sections = requestBody.categoryEditor;
                    let sectionsLength = Object.keys(sections).length - LENGTH_VALUE;
                    let sectionsLengthValue = sections.lengthValue;

                    let sectionTableLength = await DB.blog(
                        `SELECT COUNT(*) FROM section`
                    );

                    let modifiedSectionLength = sectionTableLength + sectionsLengthValue;

                    if (sectionsLengthValue > 0) {

                        for (let i = AFTER_DEFAULT; i < modifiedSectionLength; i++) {
                            let section = sections[i];
                            let sectionName = section.name;

                            queryObject.blog.result.query = `
                                UPDATE section
                                SET 
                                    name = ?,
                                    order = ?
                                WHERE id = ?
                            `;
                            queryObject.blog.result.values = [
                                sectionName,
                                i,
                                AFTER_DEFAULT + i
                            ];
                        }
                    } else if (sectionsLengthValue < 0) {
                        for (let i = AFTER_DEFAULT; i < sectionTableLength; i++) {
                            if (i < modifiedSectionLength) {
                                let section = sections[i];
                                let sectionName = section.name;
                                queryObject.blog.result.query = `
                                    UPDATE section
                                    SET 
                                        name = ?,
                                        order = ?
                                    WHERE id = ?
                                `;
                                queryObject.blog.result.values = [
                                    sectionName,
                                    i,
                                    AFTER_DEFAULT + i
                                ];
                            } else {
                                queryObject.blog.result.query = `
                                    UPDATE section
                                    SET 
                                        name = ?,
                                        order = ?
                                    WHERE id = ?
                                `;
                                queryObject.blog.result.values = [
                                    null,
                                    null,
                                    AFTER_DEFAULT + i
                                ];
                            }
                        }
                    } else {
                        for (let i = AFTER_DEFAULT; i < sectionsLength; i++) {
                            let section = sections[i];
                            let sectionName = section.name;

                            queryObject.blog.result.query = `
                                UPDATE section
                                SET 
                                    name = ?,
                                    order = ?
                                WHERE id = ?
                            `;
                            queryObject.blog.result.values = [
                                sectionName,
                                i,
                                AFTER_DEFAULT + i
                            ];
                        }
                    }

                    let categoryTableLength = await DB.server(
                        `SELECT COUNT(*) FROM category`
                    );

                    for (let i = DEFAULT_INDEX; i < sectionTableLength; i++) {
                        let categories = sections[i].categoires;
                        let categoriesLength = Object.keys(categories).length - 1;
                        let categorieslengthValue = categories.lengthValue;
                        
                        let modifiedCategoryLength = categoryTableLength + categorieslengthValue;

                        let categoryId = 0;
                        if (categorieslengthValue > 0) {
                            for (let j = 0; j < modifiedCategoryLength; j++) {
                                if (i === DEFAULT_INDEX && j === DEFAULT_INDEX) {
                                    continue;
                                }
                                
                                let category = categories[j];
                                categoryId++;
                                let categoryName = category.name;
                                let categoryOrder = (j === DEFAULT_INDEX) ? j + 1 : j;
                                
                                queryObject.blog.result.query = `
                                    UPDATE category
                                    SET
                                        name = ?,
                                        order = ?
                                    WHERE id = ?
                                `;
                                queryObject.blog.result.values = [
                                    categoryName,
                                    categoryOrder,
                                    categoryId
                                ];
                            }
                        } else if (categorieslengthValue < 0) {
                            for (let j = 0; j < categoryTableLength; j++) {
                                if (i === DEFAULT_INDEX && j === DEFAULT_INDEX) {
                                    continue;
                                }
    
                                let category = categories[j];
                                categoryId++;
                                let categoryName = category.name;
                                let categoryOrder = (j === DEFAULT_INDEX) ? j + 1 : j;
                                
                                queryObject.blog.result.query = `
                                    UPDATE category
                                    SET
                                        name = ?,
                                        order = ?
                                    WHERE id = ?
                                `;
                                queryObject.blog.result.values = [
                                    categoryName,
                                    categoryOrder,
                                    categoryId
                                ];
                            }
                        } else {
                            for (let j = 0; j < categoriesLength; j++) {
                                if (i === DEFAULT_INDEX && j === DEFAULT_INDEX) {
                                    continue;
                                }
    
                                let category = categories[j];
                                categoryId++;
                                let categoryName = category.name;
                                let categoryOrder = (j === DEFAULT_INDEX) ? j + 1 : j;
                                
                                queryObject.blog.result.query = `
                                    UPDATE category
                                    SET
                                        name = ?,
                                        order = ?
                                    WHERE id = ?
                                `;
                                queryObject.blog.result.values = [
                                    categoryName,
                                    categoryOrder,
                                    categoryId
                                ];
                            }
                        }
                    }
                    return queryObject.blog.result;
                }
            },
            [ContentType.CATEGORY]: {
                create() {
                    queryObject.blog.result.query = `
                        INSERT INTO (
                            name,
                            section_id
                        )
                        FROM category
                        VALUES (?, ?)
                    `;
                    queryObject.blog.result.values = [
                        requestObject.body.name,
                        requestObject.body.section_id
                    ];
                    return queryObject.blog.result;
                },
                read() {
                    let startPage = 1;
                    let loadAmount = 100;
                    let startIndex = (startPage - 1) * loadAmount;
                    let endIndex = (startPage * loadAmount) - 1;
                    let category_id = requestObject.query.category;
                    if (category_id === undefined) {
                        queryObject.blog.result.query = `
                            SELECT 
                                id,
                                category_id,
                                title,
                                author,
                                view_count,
                                comment_count,
                                time
                            FROM post
                            ORDER BY id DESC
                            LIMIT ?, ?;
                        `;
                        queryObject.blog.result.values = [
                            startIndex,
                            endIndex
                        ];
                    } else {
                        queryObject.blog.result.query = `
                            SELECT 
                                id,
                                category_id,
                                title,
                                author,
                                view_count,
                                comment_count,
                                time
                            FROM post
                            WHERE category_id = ?
                            ORDER BY id DESC
                            LIMIT ?, ?;
                        `;
                        queryObject.blog.result.values = [
                            category_id,
                            startIndex,
                            endIndex
                        ];
                    }
                    return queryObject.blog.result;
                },
                update() {
                    queryObject.blog.result.query = `
                        UPDATE category
                        SET 
                            name = ?,
                            section_id = ?
                        WHERE id = ?
                    `;
                    queryObject.blog.result.values = [
                        requestObject.body.name,
                        requestObject.body.section_id,
                        requestObject.body.id
                    ];
                    return queryObject.blog.result;
                },
                delete() {
                    queryObject.blog.result.query = `
                        DELETE FROM category
                        WHERE id = ?
                    `;
                    queryObject.blog.result.values = [
                        requestObject.body.id
                    ];
                    return queryObject.blog.result;
                }
            },
            [ContentType.SECTION]: {

            }
        },
        server: {
            result: {
                query: null,
                values: null,
                errorMessage: null
            },
            [ContentType.REQUEST_LOG]: {
                create() {
                    queryObject.server.result.query =
                        `INSERT INTO request_log (
                            type,
                            method, 
                            ip_address, 
                            url, 
                            body
                        ) 
                        VALUES (?, ?, ?, ?, ?);`;
                    queryObject.server.result.values = [
                        typeObject.inputType,
                        requestObject.method.toLowerCase(),
                        requestObject.headers['x-forwarded-for'],
                        requestObject.originalUrl,
                        JSON.stringify(requestObject.body)
                    ];
                    return queryObject.server.result;
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

    function init(req) {
        /* RequestObject */
        if (req === null) {
            throw new Error('[Error] init() : Parameter \'req\' is null.');
        }
        requestObject = req;

        /* typeObject */
        let requestPath = req.route.path;
        typeObject = {
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
        if (!isVerifiedType(InputType, typeObject.inputType)) {
            throw new Error('[Error] init() : Parameter \'inputType\' is wrong.');
        };
        if (!isVerifiedType(ContentType, typeObject.contentType)) {
            throw new Error('[Error] init() : Parameter \'contentType\' is wrong.');
        };
    }

    function run(req) {
        return (async () => {
            init(req);

            let blogQueryObject = queryObject.blog[typeObject.contentType][typeObject.inputType]();
            console.log('=============== DB RUN ===============')
            console.log('[ Content Type ]');
            console.log(typeObject.contentType);
            console.log('[ Input Type ]');
            console.log(typeObject.inputType);

            if (blogQueryObject.blogErrorMessage) {
                return blogQueryObject.errorMessage;
            } else {
                /* Server */
                let serverQueryObject = queryObject.server[ContentType.REQUEST_LOG][InputType.CREATE]();
                let serverResult = await DB.server(
                    serverQueryObject.query,
                    serverQueryObject.values
                );

                /* Blog */
                let blogResult = await DB.blog(
                    blogQueryObject.query,
                    blogQueryObject.values
                );

                if (blogResult.errno) {
                    console.log('[ Blog Result ]');
                    console.log(blogResult);
                    console.log('[ Blog Query ]');
                    console.log(blogQueryObject.query);
                    console.log('[ Blog Values ]');
                    console.log(blogQueryObject.values);
                    throw new Error('[Error] run() : There might be an error in query syntax on \'blog DB\'.');
                }
                if (serverResult.errno) {
                    console.log('[ Server Result ]');
                    console.log(serverResult);
                    console.log('[ Server Query ]');
                    console.log(serverQueryObject.query);
                    console.log('[ Server Values ]');
                    console.log(serverQueryObject.values);
                    throw new Error('[Error] run() : There might be an error in query syntax on \'server DB\'.');
                }
                console.log('[ blogResult ]');
                console.log(blogResult);
                console.log('=============== DB RUN ===============')

                return blogResult;
            }
        })();
    }

    return {
        InputType: InputType,
        ContentType: ContentType,
        run: run
    }
})();

module.exports = {
    run(req, res) {
        (async function () {
            res.send({
                result: await DB.run(req)
            });
        })();
    }
}