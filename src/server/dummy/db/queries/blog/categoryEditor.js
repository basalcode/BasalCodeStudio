const queryObject = require('../../queryObject');
const dbOperator = require('../../dbOperator');
const resultObject = require('../../resultObject');

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
                LEFT JOIN category
                ON section.id = category.section_id;
            `;
            let values = null;

            queryObject.push(query, values, null);
            let result = await dbOperator(dbMembers, queryObject);
            
            return resultObject(true, result);
        },
        async [InputType.UPDATE]() {
            const DEFAULT_INDEX = 0;

            let query;
            let values;
            query = `
                DELETE FROM category
                WHERE id > 0;
            `;
            queryObject.setResult(DBType.BLOG, query, null);

            query = `
                DELETE FROM section
                WHERE id > 0;
            `;
            queryObject.setResult(DBType.BLOG, query, null);

            let requestBody = requestObject.body;
            let sections = requestBody.categoryEditor;
            let sectionsLength = Object.keys(sections).length;
            let categoryId = 0;
            for (let i = DEFAULT_INDEX; i < sectionsLength; i++) {
                let section = sections[i];
                let sectionName = section.name;
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
                for (let j = DEFAULT_INDEX; j < newCategoriesLength; j++) {
                    if (i === DEFAULT_INDEX && j === DEFAULT_INDEX) {
                        continue;
                    }
                    categoryId++;

                    let category = categories[j];
                    let categoryName = category.name;

                    query = `
                        INSERT INTO category ( id, name, section_id )
                        VALUES ( ?, ?, ? );
                    `;
                    values = [categoryId, categoryName, i];
                    queryObject.setResult(DBType.BLOG, query, values, null);
                }
            }
            queryObject.push(query, values, null);
            return await dbOperator(dbMembers, queryObject);
        }
    }
    return contentQueries[inputType]();
}