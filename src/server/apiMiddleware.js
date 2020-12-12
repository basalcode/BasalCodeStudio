const log = require(__dirname + '/../shared/fancyLogger');
const requestToTarget = require('./requestToTarget');

module.exports = async (req, res) => {
    log.line('apiMiddleware', { style: 'double' });
    
    const path = req.baseUrl.split('/api')[1];

    log.container({
        title: 'STATE',
        messages: [
            { path: 'path' }
        ]
    });

    let response = requestToTarget(req, path);

    if (!response) {
        log.container({
            title: 'RESPONSE',
            messages: [
                { ERROR: 'Incorrect uri request' },

            ]
        });
        res.status(400).send('[Error] Incorrect uri request');
    }

    log.container({
        title: 'RESPONSE',
        messages: [
            { SUCCESS: 'Successfully done' },

        ]
    });
    log.line('', { style: 'double' });
    res.status(200).send(response);
}