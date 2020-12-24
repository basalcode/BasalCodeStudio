const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');
const resultObject = require('../../resultObject');

const isUndefined = require('../../../module/verifyValue').isUndefined;
const ilog = require('../../../module/improvedConsoleLog');

module.exports = async function (dbMembers) {
    let requestObject = dbMembers.requestObject;
    let InputType = dbMembers.InputType;
    let inputType = dbMembers.inputType;

    let contentQueries = {
        async [InputType.CREATE]() {
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

            queryObject.push(query, values, null);
            let dbResult = await dbOperator(dbMembers, queryObject);
            ilog.all({ dbResult: dbResult });

            if (!isUndefined(dbResult)) {
                return resultObject(true, dbResult);
            } else {
                return resultObject(false, 'Category is not exist');
            }
        },
        async [InputType.READ]() {
            const CATEGORY = 'category';
            const POST_EDITOR = 'postEditor';

            let queryString = requestObject.query;
            let page = queryString.page;

            if (page === CATEGORY) {
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

                queryObject.push(query, values, null);
                let dbResult = await dbOperator(dbMembers, queryObject);
                // ilog.all({dbResult: dbResult});

                if (!isUndefined(dbResult)) {
                    return resultObject(true, dbResult);
                } else {
                    return resultObject(false, 'Category is not exist');
                }
            } else if (page === POST_EDITOR) {
                let query = `
                    SELECT
                        id,
                        name,
                        section_id
                    FROM category
                `;

                queryObject.push(query, null, null);
                let dbResult = await dbOperator(dbMembers, queryObject);
                ilog.all({dbResult: dbResult});

                if (!isUndefined(dbResult)) {
                    return resultObject(true, dbResult);
                } else {
                    return resultObject(false, 'Unable to load category options');
                }
            } else {
                throw new Error('[Error] category.js : Invalid queryString \'page\' value.');
            }

        },
        async [InputType.UPDATE]() {
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
            queryObject.push(query, values, null);
            return await dbOperator(dbMembers, queryObject);
        },
        async [InputType.DELETE]() {
            let query = `
                DELETE FROM category
                WHERE id = ?
            `;
            let values = [
                requestObject.body.id
            ];
            queryObject.push(query, values, null);
            return await dbOperator(dbMembers, queryObject);
        }
    }
    return contentQueries[inputType]();
}