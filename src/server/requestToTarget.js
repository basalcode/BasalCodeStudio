/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');
const type = require(process.cwd() + '/../shared/typeValidation');

const dbMember = require(process.cwd() + '/dbMember');

const requestToTarget = async (req, path) => {
    log.line.single('[ requestToTarget.js ]');

    log.container.double('ACTION: request API target');
    log.message({ MESSAGE: 'find target module...' });

    const moduleName = path.split('/')[path.split('/').length - 1];
    const modulePath = '.' + path + '/' + moduleName;

    log.message({ modulePath: modulePath });

    let targetModule = null;
    let response = null;

    try {
        targetModule = require(modulePath);
    } catch(error) {
        response = {
            statusCode: 404,
            payload: null,
            errorMessage: 'Failed to load resource.'
        }

        log.container.double('RESULT: error');
        log.message({ error: error });
    }

    try {
        response = await targetModule(req, dbMember);
    } catch (error) {
        const targetModuleType = type.getTypeOf(targetModule);
        response = {
            statusCode: 500,
            payload: null,
            errorMessage: 'Failed to call targetModule.'
        }

        log.container.double('RESULT: error');
        log.message({ targetModuleType: targetModuleType });
        log.message({ error: error });
    }
    
        
    if (!response) {
        response = {
            statusCode: 500,
            payload: null,
            errorMessage: 'Empty response object.'
        }
        
        log.container.double('RESULT: error');
    } else {
        log.container.double('RESULT: success');
    }
    log.message({ response: response });
    log.print();

    return response;
}

module.exports = requestToTarget;