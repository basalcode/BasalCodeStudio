const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');

module.exports = async function (dbMembers) {
    let requestObject = dbMembers.requestObject;
    let InputType = dbMembers.InputType;
    let inputType = dbMembers.inputType;

    let contentQueries = {
        async [InputType.READ]() {
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
        
        queryObject.push(query, values, null);
        return await dbOperator(dbMembers, queryObject);
        }
    }
    return contentQueries[inputType]();
}