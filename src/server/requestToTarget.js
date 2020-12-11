const requestToTarget = (req, path) => {
    let moduleExist = false;
    let targetModule = null;
    try {
        console.log('[request] find module');

        const moduleName = path.split('/')[path.split('/').length - 1];
        console.log('[module]', '.' + path + '/' + moduleName);
        targetModule = require('.' + path + '/' + moduleName);
        
        console.log('[request] path validation success!');
        moduleExist = true;
    } catch(error) {
        console.log('[request] path validation failed!');
        
        moduleExist = false;
    } finally {
        if (moduleExist) {
            return targetModule(req);
        } else {
            return null;
        }
    }
}


module.exports = requestToTarget;