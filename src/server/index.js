const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const axios = require('axios');
// const fs = require('fs');
const path = require('path');
const app = express();

const log = require(__dirname + '/../shared/fancyLogger');

/* production server */
app.use('/', express.static(path.resolve(__dirname, '../../build')));

log.line();
app.use('/api', createProxyMiddleware('/api', { target: 'http://localhost:3030' }));
app.use('/*', (req, res, next) => {
    console.log('[Request build file]'); 
    console.log('[originalUrl]', req.originalUrl);
    res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.listen(3000);