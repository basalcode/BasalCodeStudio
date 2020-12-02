const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

/* production server */
// with server-side rendering
app.use('/', express.static(path.resolve(__dirname, '../../build')));

app.use('*', (req, res, next) => {  

    console.log(req.originalUrl);
    console.log('req.path', req.path);
    if (req.path.split('/')[1] === 'static') {
        return next();
    }
    // console.log('[Production Server]', __dirname);

    res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.listen(3000);