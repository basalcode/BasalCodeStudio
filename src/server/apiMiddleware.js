const requestToTarget = require('./requestToTarget');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, res) => {
    log.line.single('[ apiMiddleware.js ]');

    const path = req.baseUrl.split('/api')[1];

    log.container.double('STATE');
    log.message({ path: path });

    let response = await requestToTarget(req, path);

    if (response) {
        log.container.double('RESPONSE');
        log.message({ SUCCESS: 'Successfully done' });
        log.print();

        res.status(200).send(response);
    } else {
        log.container.double('RESPONSE');
        log.message({ ERROR: 'Incorrect uri request' });
        log.print();

        res.status(400).send('[Error] Incorrect uri request');
    }
}