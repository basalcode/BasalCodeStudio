module.exports = (req, res) => {
    const uri = req.originalUrl.split('/api')[1];
    const firstResource = uri.split('/')[1];

    console.log('[uri]', uri);
    console.log('[firstResource]', firstResource);

    switch(firstResource) {
        case 'user':
            console.log('user success!!');
            break;
        
        default:
            res.status(400).send('[Error] Incorrect url request');
            break;
    }

    res.status(200).send();
}