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
        async [InputType.READ]() {
            let query = `
                SELECT 
                    section.id,
                    section.name
                FROM section
            `;
            queryObject.push(query, null, null);

            let dbResult = await dbOperator(dbMembers, queryObject);
            ilog.all({dbResult: dbResult});
            
            if (!isUndefined(dbResult)) {
                return resultObject(true, dbResult);
            } else { 
                return resultObject(false, 'Unable to load section options.');
            }
        }
    }
    return contentQueries[inputType]();
}