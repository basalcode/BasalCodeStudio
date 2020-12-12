module.exports = req => {
    const method = req.method;

    log.line('user', { style: 'double' });
    log.container({
        title: 'STATE',
        messages: [
            { method: 'method' }
        ]
    });

    let response = true;
    switch (method) {
        case 'POST':
            break;
        case 'GET':
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
        default:
            break;
    }


    console.log('==========');
    return response;
}