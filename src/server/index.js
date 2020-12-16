const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();

/* shared */
const log = require('../shared/fancyLogger');

/* production server */
app.use('/', express.static(path.resolve(__dirname, '../../build')));

log.line.double();
log.print();

app.use('/api', createProxyMiddleware('/api', { target: 'http://localhost:3030' }));
app.use('/*', (req, res, next) => {
    log.line.double('Request Build Files');
    log.message({originalUrl: req.originalUrl});
    log.print();
    res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.listen(3000);