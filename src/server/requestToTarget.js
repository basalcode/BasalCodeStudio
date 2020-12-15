/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

const dbMember = require(process.cwd() + '/dbMember');

const requestToTarget = async (req, path) => {
    log.line.double('requestToTarget.js');

    let moduleExist = false;
    let targetModule = null;
    try {
        log.line.single('ACTION');
        log.message({ MESSAGE: 'find target module' });

        const moduleName = path.split('/')[path.split('/').length - 1];
        const modulePath = '.' + path + '/' + moduleName;

        log.message({ modulePath: modulePath });
        log.line.single();

        targetModule = require(modulePath);

        moduleExist = true;
    } catch (error) {
        console.log('[error]', error);

        moduleExist = false;
    } finally {
        if (moduleExist) {
            log.line.single('RESPONSE');
            log.message({ SUCCESS: 'path validation success!' });
            log.line.single('');
            log.line.double('');
            log.print();

            return await targetModule(req, dbMember);
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