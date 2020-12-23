const requestToTarget = require('./requestToTarget');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

module.exports = async (req, res) => {
    log.line.star('R E Q U E S T');
    log.message({ START: 'Request to API Server' })
    log.line.star('');
    
    log.line.single('[ apiMiddleware.js ]');
    
    const path = req.baseUrl.split('/api')[1];
    
    log.container.double('ACTION: call requestToTarget');
    log.message({ originalUrl: req.originalUrl });
    log.message({ path: path });
    log.print();

    let response = await requestToTarget(req, path);

    if (response) {
        log.container.double('RESULT: [success] call requestToTarget');
        log.message({ response: response });
    } else {
        response = {
            statusCode: 500,
            payload: null,
            errorMessage: 'Empty response object.'
        }
        
        log.container.double('RESULT: [error] call requestToTarget');
        log.message({ response: response });

    }
    
    const statusCode = response.statusCode;

    log.line.star('');
    log.message({ FINISH: `[${statusCode}] Request to API Server` });
    log.line.star('R E S P O N S E');
    log.print();
    log.space();

    res.status(statusCode).send(response);
}