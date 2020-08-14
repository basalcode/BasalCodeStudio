const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');

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
            return await dbOperator(dbMembers, queryObject);
        },
        async [InputType.READ]() {
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

            queryObject.push(query, values, null);
            return await dbOperator(dbMembers, queryObject);
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