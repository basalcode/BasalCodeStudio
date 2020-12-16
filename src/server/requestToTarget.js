/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

const dbMember = require(process.cwd() + '/dbMember');

const requestToTarget = async (req, path) => {
    log.line.single('[ requestToTarget.js ]');

    let moduleExist = false;
    let targetModule = null;
    try {
        log.container.double('ACTION');
        log.message({ MESSAGE: 'find target module' });

        const moduleName = path.split('/')[path.split('/').length - 1];
        const modulePath = '.' + path + '/' + moduleName;

        log.message({ modulePath: modulePath });

        targetModule = require(modulePath);

        moduleExist = true;
    } catch (error) {
        console.log('[error]', error);

        moduleExist = false;
    } finally {
        if (moduleExist) {
            log.container.double('RESPONSE');
            log.message({ SUCCESS: 'path validation success!' });
            log.print();

            return await targetModule(req, dbMember);
        } else {
            log.line.double('RESPONSE');
            log.message({ ERROR: 'path validation failed!' });
            log.print();

            return null;
        }
    }
}

module.exports = requestToTarget;