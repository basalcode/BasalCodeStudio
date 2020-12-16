/* query */
const queryObject = require(process.cwd() + '/../../.private/query/api/user/email/email');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, dbMember) => {
    log.line.single('[ email.js ]');

    const method = req.method;

    log.container.double('STATE');
    log.message({ method: method });
    
    let response = null;
    switch (method) {
        case 'POST':
            break;
        case 'GET':
            const emailValue = req.query.value;

            const query = queryObject[method];
            const values = [emailValue];

            const dbResult = await dbMember.user.run(query, values);

            response = dbResult;
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
        default:
            break;
    }

    log.container.double('RESPONSE');
    log.message({ response: response });
    log.print();

    return response;
}