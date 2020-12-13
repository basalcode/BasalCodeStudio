/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = req => {
    const method = req.method;

    log.line.double('user');
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