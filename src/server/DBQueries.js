module.exports = function (dbMembers) {
    let requestObject = dbMembers.requestObject;
    
    let DBType = dbMembers.DBType;
    let InputType = dbMembers.InputType;
    let ContentType = dbMembers.ContentType;

    let queryObject = {
        setResult: function (db, query, values, errorMessage) {
            if (db !== 'server') {
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
        [DBType.USER]: {
            result: {
                query: [],
                values: [],
                errorMessage: [],
                length: 0
            },
            [ContentType.ACOUNT]: {
                [InputType.CREATE]() {
                    let requestBody = requestObject.body;
                    let email = requestBody.email;
                    let password = requestBody.password;
                    let userName = requestBody.userName;

                    let query = `
                        INSERT INTO account (
                            email, 
                            password, 
                            user_name
                        )
                        VALUES ( ?, ?, ? );
                    `;
                    let values = [
                        email,
                        password,
                        userName
                    ];
                    return queryObject.setResult(DBType.USER, query, values, null);
                }
            },
        },
        [DBType.BLOG]: {
            result: {
                query: [],
                values: [],
                errorMessage: [],
                length: 0
            },
            [ContentType.POST]: {
                [InputType.CREATE]() {
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
                        let requestBody = requestObject.body;

                        let title = requestBody.title;
                        let author = requestBody.author;
                        let description = requestBody.description;
                        let category_id = requestBody.category_id;

                        let query = `
                            INSERT INTO post (
                                title,
                                author,
                                description,
                                category_id
                            ) 
                            VALUES (?, ?, ?, ?);
                        `;
                        let values = [
                            title,
                            author,
                            description,
                            category_id
                        ];
                        return queryObject.setResult(DBType.BLOG, query, values, null);
                    }
                },
                [InputType.READ]() {
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
                [InputType.UPDATE]() {
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
                        let requestBody = requestObject.body;

                        let id = requestBody.id;
                        let title = requestBody.title;
                        let author = requestBody.author;
                        let description = requestBody.description;
                        let category_id = requestBody.category_id;
                        let query = `
                            UPDATE post 
                            SET 
                                title = ?, 
                                author = ?, 
                                description = ?,
                                category_id = ?
                            WHERE id=?;
                        `;
                        let values = [
                            title,
                            author,
                            description,
                            category_id,
                            id
                        ];
                        return queryObject.setResult(DBType.BLOG, query, values, null);
                    }
                },
                [InputType.DELETE]() {
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
                [InputType.READ]() {
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
                [InputType.UPDATE]() {
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
                [InputType.CREATE]() {
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
                [InputType.READ]() {
                    let queryString = requestObject.query;
                    let category_id = queryString.category;

                    const startPage = 1;
                    const loadAmount = 100;
                    let startIndex = (startPage - 1) * loadAmount;
                    let endIndex = (startPage * loadAmount) - 1;

                    let query = `
                        SELECT 
                            id,
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
                    let values = [
                        category_id,
                        startIndex,
                        endIndex
                    ];

                    return queryObject.setResult(DBType.BLOG, query, values, null);
                },
                [InputType.UPDATE]() {
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
                [InputType.DELETE]() {
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
                [InputType.READ]() {
                    let query = `
                        SELECT 
                            section.id AS section_id,
                            section.name AS section_name,
                            category.id AS category_id,
                            category.name AS category_name
                        FROM section
                        JOIN category
                        ON section.id = category.section_id;
                    `;
                    return queryObject.setResult(DBType.BLOG, query, null, null);
                }
            }
        },
        [DBType.SERVER]: {
            result: {
                query: [],
                values: [],
                errorMessage: [],
                length: 0
            },
            [ContentType.REQUEST_LOG]: {
                [InputType.CREATE]() {
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
                    console.log('requestObject', requestObject);
                    console.log('requestObject.method', requestObject.method);
                    let values = [
                        dbMembers.inputType,
                        requestObject.method.toLowerCase(),
                        requestObject.headers['x-forwarded-for'],
                        requestObject.originalUrl,
                        JSON.stringify(requestObject.body)
                    ];
                    return queryObject.setResult(DBType.SERVER, query, values, null);
                },
                [InputType.READ]() {
                },
                [InputType.UPDATE]() {
                },
                [InputType.DELETE]() {
                }
            }
        }
    }
    return {
        queryObject: queryObject
    }
}