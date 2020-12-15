const dbMiddleware = require('./dbMiddleware');

/* private */
const private = require(process.cwd() + '/../../.private/security/db');

module.exports = (() => {
    const blog = dbMiddleware(
        private.host,
        private.user,
        private.password,
        private.name.blog
    );
    const user = dbMiddleware(
        private.host,
        private.user,
        private.password,
        private.name.user
    );
    const log = dbMiddleware(
        private.host,
        private.user,
        private.password,
        private.name.server
    );
    
    return {
        blog: blog,
        user: user,
        log: log
    };
})();