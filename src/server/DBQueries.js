module.exports = function (dbMembers) {
    let DB = dbMembers.DB;
    let DBType = dbMembers.DBType;
    let InputType = dbMembers.InputType;
    let ContentType = dbMembers.ContentType;
    let requestObject = dbMembers.requestObject;

    let queryObject = {
        setResult: function (db, query, values, errorMessage) {
            if (db === 'blog') {
                console.log('[ PUSH ]', query);
                console.log('[ PUSH ]', values);
            }

            if (queryObject[db].result.query === null) {
                queryObject[db].result.query = [];
            }
            if (queryObject[db].result.values === null) {
                queryObject[db].result.values = [];
            }
            if (queryObject[db].result.errorMessage === null) {
                queryObject[db].result.errorMessage = [];
            }
            queryObject[db].result.query.push(query);
            queryObject[db].result.values.push(values);
            queryObject[db].result.errorMessage.push(errorMessage);
            queryObject[db].result.length += 1;

            return queryObject[db].result;
        },
        getResult: function (db) {
            return queryObject[db].result;
        },
        getResultLength: function (db) {
            return queryObject[db].result.length;
        },
        blog: {
            result: {
                query: [],
                values: [],
                errorMessage: [],
                length: 0
            },
            [ContentType.TEST]: {
                test() {
                    console.log('[requestObject]', requestObject);

                    let query = ``;
                    let values = ``;
                    return queryObject.setResult(DBType.BLOG, query, values, null);
                }
            },
            [ContentType.POST]: {
                create() {
                    if (requestObject.body.title.length === 0) {
                        let errorMessage = 'There is no title.';
                        return queryObject.setResult(DBType.BLOG, null, null, errorMessage);
                    } else if (requestObject.body.author.length === 0) {
                        let errorMessage = 'There is no author.';
                        return queryObject.setResult(DBType.BLOG, null, null, errorMessage);
                    } else if (requestObject.body.description.length === 0) {
                        let errorMessage = 'There is no description.';
                        return queryObject.setResult(DBType.BLOG, null, null, errorMessage);
                    } else {
                        let query = `
                            INSERT INTO post (
                                title,
                                author,
                                description
                            ) 
                            VALUES (?, ?, ?);
                        `;
                        let values = [
                            requestObject.body.title,
                            requestObject.body.author,
                            requestObject.body.description
                        ];
                        return queryObject.setResult(DBType.BLOG, query, values, null);
                    }
                },
                read() {
                    let post_id = requestObject.query.post;
                    let query = `
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
                    let values = [
                        post_id
                    ];
                    return queryObject.setResult(DBType.BLOG, query, values, null);
                },
                update() {
                    if (requestObject.body.title.length === 0) {
                        let errorMessage = 'There is no title.';
                        return queryObject.setResult(DBType.BLOG, null, null, errorMessage);
                    } else if (requestObject.body.author.length === 0) {
                        let errorMessage = 'There is no author.';
                        return queryObject.setResult(DBType.BLOG, null, null, errorMessage);
                    } else if (requestObject.body.description.length === 0) {
                        let errorMessage = 'There is no description.';
                        return queryObject.setResult(DBType.BLOG, null, null, errorMessage);
                    } else {
                        // let post_id = requestObject.body.post;
                        let query = `
                            UPDATE post 
                            SET 
                                title=?, 
                                author=?, 
                                description=? 
                            WHERE id=?;
                        `;
                        let values = [
                            requestObject.body.title,
                            requestObject.body.author,
                            requestObject.body.description,
                            requestObject.body.post_id
                        ];
                        return queryObject.setResult(DBType.BLOG, query, values, null);
                    }
                },
                delete() {
                    let post_id = requestObject.body.post;
                    let query = `
                        DELETE FROM post 
                        WHERE id=?
                    `;
                    let values = [
                        post_id
                    ];
                    return queryObject.setResult(DBType.BLOG, query, values, null);
                }
            },
            [ContentType.CATEGORY_EDITOR]: {
                read() {
                    let query = `
                        SELECT 
                            section.id AS section_id,
                            section.name AS section_name,
                            category.id AS category_id,
                            category.name AS category_name
                        FROM section
                        LEFT JOIN category
                        ON section.id = category.section_id;
                    `;
                    return queryObject.setResult(DBType.BLOG, query, null, null);
                },
                update() {
                    const DEFAULT_INDEX = 0;

                    let query;
                    let values;
                    console.log('========= DELETE TABLES =========');
                    console.log('--------- CLEAR SECTION TABLE ---------');
                    query = `
                        DELETE FROM category
                        WHERE id > 0;
                    `;
                    queryObject.setResult(DBType.BLOG, query, null, null);

                    query = `
                        DELETE FROM section
                        WHERE id > 0;
                    `;
                    queryObject.setResult(DBType.BLOG, query, null, null);

                    let requestBody = requestObject.body;
                    let sections = requestBody.categoryEditor;
                    let sectionsLength = Object.keys(sections).length;
                    console.log('[requestBody]', requestBody);
                    console.log('[newSections]', sections);
                    console.log('[newSectionsLength]', sectionsLength);
                    let categoryId = 0;
                    for (let i = DEFAULT_INDEX; i < sectionsLength; i++) {
                        console.log('========= UPDATE SECTION =========');
                        let section = sections[i];
                        let sectionName = section.name;
                        console.log('[section]', section);
                        console.log('[sectionName]', sectionName);

                        if (i > DEFAULT_INDEX) {
                            query = `
                                INSERT INTO section ( id, name )
                                VALUES ( ?, ? );
                            `;
                            values = [i, sectionName];
                            queryObject.setResult(DBType.BLOG, query, values, null);
                        }


                        let categories = section.categories;
                        let newCategoriesLength = Object.keys(categories).length;
                        console.log('[categories]', categories);
                        console.log('[newCategoriesLength]', newCategoriesLength);
                        for (let j = DEFAULT_INDEX; j < newCategoriesLength; j++) {
                            console.log('========= UPDATE CATEGORY =========');
                            if (i === DEFAULT_INDEX && j === DEFAULT_INDEX) {
                                continue;
                            }
                            categoryId++;

                            console.log('[categoryId]', categoryId);
                            let category = categories[j];
                            let categoryName = category.name;
                            console.log('[category]', category);
                            console.log('[categoryName]', categoryName);

                            query = `
                                INSERT INTO category ( id, name, section_id )
                                VALUES ( ?, ?, ? );
                            `;
                            values = [categoryId, categoryName, i];

                            queryObject.setResult(DBType.BLOG, query, values, null);
                        }
                    }
                    return queryObject.getResult(DBType.BLOG);
                }
            },
            [ContentType.CATEGORY]: {
                create() {
                    let query = `
                        INSERT INTO (
                            name,
                            section_id
                        )
                        FROM category
                        VALUES (?, ?)
                    `;
                    let values = [
                        requestObject.body.name,
                        requestObject.body.section_id
                    ];

                    return queryObject.setResult(DBType.BLOG, query, values, null);
                },
                read() {
                    const Page = {
                        CATEGORY: 'category',
                        POST_EDITOR: 'postEditor'
                    }
                    let queryString = requestObject.query;
                    let page = queryString.page;

                    let query = null;
                    let values = null;
                    let errorMessage = null;
                    if (page === Page.CATEGORY) {
                        const startPage = 1;
                        const loadAmount = 100;
                        let startIndex = (startPage - 1) * loadAmount;
                        let endIndex = (startPage * loadAmount) - 1;

                        let category_id = queryString.category;

                        if (category_id === 0) {
                            query = `
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
                            values = [
                                startIndex,
                                endIndex
                            ];
                            
                        } else {
                            query = `
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
                            values = [
                                category_id,
                                startIndex,
                                endIndex
                            ];
                        }
                    } else if (page === Page.POST_EDITOR) {
                        let section_id = queryString.section;
                        
                        query = `
                            SELECT id, name
                            FROM category
                            WHERE section_id = ?;
                        `; 
                        values = [ section_id ];
                    } else {
                        errorMessage = 'Wrong page argument.';
                    }
                    return queryObject.setResult(DBType.BLOG, query, values, errorMessage);
                },
                update() {
                    let query = `
                        UPDATE category
                        SET 
                            name = ?,
                            section_id = ?
                        WHERE id = ?
                    `;
                    let values = [
                        requestObject.body.name,
                        requestObject.body.section_id,
                        requestObject.body.id
                    ];
                    return queryObject.setResult(DBType.BLOG, query, values, null);
                },
                delete() {
                    let query = `
                        DELETE FROM category
                        WHERE id = ?
                    `;
                    let values = [
                        requestObject.body.id
                    ];
                    return queryObject.setResult(DBType.BLOG, query, values, null);
                }
            },
            [ContentType.SECTION]: {
                read() {
                    let query = `
                        SELECT id, name
                        FROM section;
                    `;
                    return queryObject.setResult(DBType.BLOG, query, null, null);
                }
            }
        },
        server: {
            result: {
                query: [],
                values: [],
                errorMessage: [],
                length: 0
            },
            [ContentType.REQUEST_LOG]: {
                create() {
                    let query = `
                        INSERT INTO request_log (
                            type,
                            method, 
                            ip_address, 
                            url, 
                            body
                        ) 
                        VALUES (?, ?, ?, ?, ?);
                    `;
                    let values = [
                        dbMembers.typeObject.inputType,
                        requestObject.method.toLowerCase(),
                        requestObject.headers['x-forwarded-for'],
                        requestObject.originalUrl,
                        JSON.stringify(requestObject.body)
                    ];
                    return queryObject.setResult(DBType.SERVER, query, values, null);
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
    return {
        queryObject: queryObject
    }
}