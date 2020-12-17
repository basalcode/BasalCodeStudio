/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

const dbMember = require(process.cwd() + '/dbMember');

const requestToTarget = async (req, path) => {
    log.line.single('[ requestToTarget.js ]');

    let targetModule = null;

    let response = null;
    try {
        log.container.double('ACTION: request API target');
        log.message({ MESSAGE: 'find target module...' });

        const moduleName = path.split('/')[path.split('/').length - 1];
        const modulePath = '.' + path + '/' + moduleName;

        log.message({ modulePath: modulePath });

        targetModule = require(modulePath);

        response = await targetModule(req, dbMember);
            
        if (!response) {
            response = {
                statusCode: 500,
                payload: null,
                errorMessage: 'Empty response object.'
            }
            
            log.container.double('RESULT: error');
            log.message({ response: response });
        }
    } catch (error) {
        response = {
            statusCode: 404,
            payload: null,
            errorMessage: 'Unavailable resource.'
        }

        log.container.double('RESULT: error');
        log.message({ response: response });
        log.message({ error: error });
    }
    log.print();

    return response;
}

module.exports = requestToTarget;