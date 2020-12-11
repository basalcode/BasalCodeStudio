module.exports = req => {
    const method = req.method;

    console.log('==========');
    console.log('[method]', method);
    console.log('[target] email');
    
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