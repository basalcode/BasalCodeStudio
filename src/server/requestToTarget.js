/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

const requestToTarget = (req, path) => {
    log.line.double('requestToTarget.js');

    let moduleExist = false;
    let targetModule = null;
    try {
        log.line.single('ACTION');
        log.message({ MESSAGE: 'find target module' });

        const moduleName = path.split('/')[path.split('/').length - 1];
        const modulePath = '.' + path + '/' + moduleName;

        log.message({ modulePath: modulePath });
        console.log('AAAAAAAAAAAAAAAA');
        log.line.single();

        targetModule = require(modulePath);

        moduleExist = true;
    } catch (error) {
        console.log('AAAAAAAAAAAAAAAA');
        console.log('[error]', error);
        console.log('AAAAAAAAAAAAAAAA');

        moduleExist = false;
    } finally {
        if (moduleExist) {
            log.line.single('RESPONSE');
            log.message({ SUCCESS: 'path validation success!' });
            log.line.single('');
            log.line.double('');
            log.print();

            return targetModule(req);
        } else {
            log.line.single('RESPONSE');
            log.message({ ERROR: 'path validation failed!' });
            log.line.single('');
            log.line.double('');
            log.print();

            return null;
        }
    }
}

module.exports = requestToTarget;