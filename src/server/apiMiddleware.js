const requestToTarget = require('./requestToTarget');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, res) => {
    log.line.star('R E Q U E S T');
    log.message({ START: 'Request to API Server' })
    log.line.star('');
    log.print();

    log.line.single('[ apiMiddleware.js ]');

    const path = req.baseUrl.split('/api')[1];

    log.container.double('STATE: API request uri');
    log.message({ originalUrl: req.originalUrl });
    log.message({ path: path });
    let response = await requestToTarget(req, path);

    if (response) {
        log.container.double('RESULT: API response');
        log.message({ response: response });
    } else {
        response = {
            statusCode: 500,
            payload: null,
            errorMessage: 'Empty response object.'
        }
        
        log.container.double('RESULT: error');
        log.message({ response: response });
    }
    
    
    const statusCode = response.statusCode;

    log.line.star('');
    log.message({ statusCode: statusCode });
    log.line.star('R E S P O N S E');

    log.print();

    res.status(statusCode).send(response);
}