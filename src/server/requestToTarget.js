/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');
const type = require(process.cwd() + '/../shared/typeValidation');

const dbMember = require(process.cwd() + '/dbMember');

const requestToTarget = async (req, path) => {
    log.line.single('[ requestToTarget.js ]');

    log.container.double('ACTION: check basic values');

    const moduleName = path.split('/')[path.split('/').length - 1];
    const modulePath = '.' + path + '/' + moduleName;

    log.message({ modulePath: modulePath });

    let targetModule = null;
    let response = null;
    
    try {
        log.container.double('ACTION: load target module');
        targetModule = require(modulePath);
    } catch(error) {
        response = {
            statusCode: 404,
            payload: null,
            errorMessage: 'Failed to load target module.'
        }
        
        const targetModuleType = type.getTypeOf(targetModule);

        log.container.double('RESULT: [error] load target module');
        console.log('[error]', error);
        log.message({ error: error });
        log.message({ targetModuleType: targetModuleType });
        log.print();

        return response;
    }

    log.container.double('RESULT: [success] load target module');
    const targetModuleType = type.getTypeOf(targetModule);
    log.message({ targetModuleType: targetModuleType });

    try {
        log.container.double('ACTION: call target module');
        log.print();

        response = await targetModule(req, dbMember);

        log.container.double('RESULT: [success] call target module');
        log.message({ response: response });
    } catch (error) {
        response = {
            statusCode: 500,
            payload: null,
            errorMessage: 'Failed to call targetModule.'
        }

        log.container.double('RESULT: [error] call target module');
        log.message({ targetModuleType: targetModuleType });
        log.message({ error: error });
    }
    
    log.container.double('ACTION: return response');
    if (!response) {
        response = {
            statusCode: 500,
            payload: null,
            errorMessage: 'Empty response object.'
        }
        
        log.container.double('RESULT: [error] return response');
    } else {
        log.container.double('RESULT: [success] return response');
    }
    log.message({ response: response });
    log.print();

    return response;
}

module.exports = requestToTarget;