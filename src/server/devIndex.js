const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

/* development server */
// with server-side rendering
app.use('/', express.static(path.resolve(__dirname, '../../build')));

app.get('*', (req, res, next) => {
    if (req.path.split('/')[1] === 'static') {
        return next();
    }
    console.log('[Development Server]', __dirname);

    res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.listen(3001);