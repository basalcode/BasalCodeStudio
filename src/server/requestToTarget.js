const log = require(__dirname + '/../shared/fancyLogger');

const requestToTarget = (req, path) => {
    log.line('requestToTarget', { style: 'double' });

    let moduleExist = false;
    let targetModule = null;
    try {
        log.line('ACTION');
        log.message({MESSAGE: 'find target module'});
        
        const moduleName = path.split('/')[path.split('/').length - 1];
        const modulePath = '.' + path + '/' + moduleName

        log.message({modulePath: modulePath});

        targetModule = require(modulePath);

        moduleExist = true;
    } catch(error) {
        moduleExist = false;
    } finally {
        if (moduleExist) {
            log.message({SUCCESS: 'path validation success!'});
            log.line('');

            return targetModule(req);
        } else {
            log.message({ERROR: 'path validation failed!'});
            log.line('');

            return null;
        }
    }
}

module.exports = requestToTarget;