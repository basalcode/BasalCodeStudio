const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');

module.exports = async function (dbMembers) {
    let requestObject = dbMembers.requestObject;
    let InputType = dbMembers.InputType;
    let inputType = dbMembers.inputType;

    let contentQueries = {
        async [InputType.CREATE]() {
            if (requestObject.body.title.length === 0) {
                let errorMessage = 'There is no title.';
                return errorMessage;
            } else if (requestObject.body.author.length === 0) {
                let errorMessage = 'There is no author.';
                return errorMessage;
            } else if (requestObject.body.description.length === 0) {
                let errorMessage = 'There is no description.';
                return errorMessage;
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
                queryObject.push(query, values, null);
                return await dbOperator(dbMembers, queryObject);
            }
        },
        async [InputType.READ]() {
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
            queryObject.push(query, values, null);
            return await dbOperator(dbMembers, queryObject);
        },
        async [InputType.UPDATE]() {
            if (requestObject.body.title.length === 0) {
                let errorMessage = 'There is no title.';
                return errorMessage;
            } else if (requestObject.body.author.length === 0) {
                let errorMessage = 'There is no author.';
                return errorMessage;
            } else if (requestObject.body.description.length === 0) {
                let errorMessage = 'There is no description.';
                return errorMessage;
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
                queryObject.push(query, values, null);
                return await dbOperator(dbMembers, queryObject);
            }
        },
        async [InputType.DELETE]() {
            let post_id = requestObject.body.post;
            let query = `
                DELETE FROM post 
                WHERE id=?
            `;
            let values = [
                post_id
            ];
            queryObject.push(query, values, null);
            return await dbOperator(dbMembers, queryObject);
        }
    }
    return contentQueries[inputType]();
}