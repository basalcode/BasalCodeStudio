const requestToTarget = require('./requestToTarget');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, res) => {
    log.line.double('apiMiddleware.js');

    const path = req.baseUrl.split('/api')[1];

    log.line.single('STATE');
    log.message({ path: path });
    log.line.single('');

    let response = await requestToTarget(req, path);

    if (response) {
        log.line.single('RESPONSE');
        log.message({ SUCCESS: 'Successfully done' });
        log.line.single('');
        log.line.double('');
        log.print();

        res.status(200).send(response);
    } else {
        log.line.single('RESPONSE');
        log.message({ ERROR: 'Incorrect uri request' });
        log.line.single('');
        log.line.double('');
        log.print();

        res.status(400).send('[Error] Incorrect uri request');
    }
}