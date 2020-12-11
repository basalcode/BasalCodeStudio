const requestToTarget = require('./requestToTarget');

module.exports = async (req, res) => {
    const path = req.baseUrl.split('/api')[1];

    console.log('==================================================');
    console.log('[WHERE] apiMiddleware');
    console.log('---------------------INFO-------------------------');
    console.log('[entire path]', path);
    console.log('--------------------------------------------------');

    let response = requestToTarget(req, path);

    if (!response) {
        console.log('---------------------MESSAGE----------------------');
        console.log('[reponse error] Incorrect uri request');
        console.log('--------------------------------------------------');
        console.log('==================================================');
        res.status(400).send('[Error] Incorrect uri request');
    }

    console.log('---------------------MESSAGE----------------------');
    console.log('[response success] Successfully done');
    console.log('--------------------------------------------------');
    console.log('==================================================');
    res.status(200).send(response);
}