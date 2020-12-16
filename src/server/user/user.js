/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, dbMember) => {
    log.line.single('[ user.js ]');

    const method = req.method;

    log.container.double('STATE');
    log.message({ method: method });

    let response = null;
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

    log.print();

    return response;
}