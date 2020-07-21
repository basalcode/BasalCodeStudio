module.exports = (function() {
    let queryObject;
    let typeObject;
    let requestObject;
    return {
        /* st-mysql */
        DB: {
            blog: require('st-mysql')({
                host: 'localhost', user: 'root', password: '1135', database: 'blog', flat: true, encode: false
            }),
            server: require('st-mysql')({
                host: 'localhost', user: 'root', password: '1135', database: 'server', flat: true, encode: false
            })
        },
        DBType: {
            BLOG: 'blog',
            SERVER: 'server'
        },
        InputType: {
            TEST: 'test',
            CREATE: 'create',
            READ: 'read',
            UPDATE: 'update',
            DELETE: 'delete'
        },
        ContentType: {
            TEST: 'test',
            POST: 'post',
            CATEGORY_EDITOR: 'categoryEditor',
            CATEGORY: 'category',
            SECTION: 'section',
            REQUEST_LOG: 'requestLog'
        },
        get queryObject() { return queryObject; },
        set queryObject(value) { queryObject = value; },
        get typeObject() { return typeObject; },
        set typeObject(value) { typeObject = value; },
        get requestObject() { return requestObject; },
        set requestObject(value) { requestObject = value; }
    }
})();