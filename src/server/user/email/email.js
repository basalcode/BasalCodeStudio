/* query */
const queryObject = require(process.cwd() + '/../../.private/query/api/user/email/email');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, dbMember) => {
    const method = req.method;

    log.line.double('email');
    log.line.single('STATE');
    log.message({ method: method });
    log.line.single();
    log.line.double();
    log.print();
    
    let response = true;
    switch (method) {
        case 'POST':
            break;
        case 'GET':
            const emailValue = req.query.value;

            const query = queryObject[method];
            const values = [emailValue];

            const dbResult = await dbMember.user.run(query, values);

            console.log('*****************');
            console.log('[dbResult]', dbResult);
            console.log('*****************');

            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
        default:
            break;
    }

    return response;
}